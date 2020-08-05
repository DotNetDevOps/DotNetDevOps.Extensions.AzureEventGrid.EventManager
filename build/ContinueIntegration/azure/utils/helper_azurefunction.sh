#!/bin/bash
set -Eeuxo pipefail
 
#Create Storage Account (all lower case)
runtimeStorageAccountName=$(echo "${prefixShort}${storageAccountName}${locationShort}${projectEnv}" | sed 's/-//g' | awk '{print tolower($0)}')
accountNameLength=$(expr length "${accountName}")

if [ ${accountNameLength} -gt 23 ]
then
    COUNT=`expr ${accountNameLength} - 23`
	acnshort=$(echo "${storageAccountName}" | rev | cut -c ${COUNT}- | rev)
	runtimeStorageAccountName=$(echo "${prefixShort}${acnshort}${locationShort}${projectEnv}" | sed 's/-//g' | awk '{print tolower($0)}')
fi


az storage account create -n ${runtimeStorageAccountName} --sku Standard_LRS --kind StorageV2


echo "Creating ${functionAppName}"
az functionapp create --functions-version 3 -n ${functionAppName} --storage-account ${runtimeStorageAccountName} --consumption-plan-location ${location} --app-insights-key ${instrumentationKey} --runtime dotnet -g ${rgname}
 
echo "Assigning Access for ${functionAppName}"
FunctionAppResourceId=$(az functionapp show --name ${functionAppName} | jq -r '.id')
az functionapp identity assign --name ${functionAppName} --resource-group ${rgname} --role Contributor --scope ${FunctionAppResourceId}

if [[ -v AEGResourceId ]]; then
    az functionapp identity assign --name ${functionAppName} --resource-group ${rgname} --role Contributor --scope ${AEGResourceId}
    az functionapp identity assign --name ${functionAppName} --resource-group ${rgname} --role "Storage Blob Data Contributor" --scope ${AEGDeadLetterDestinationResourceId}
    az functionapp identity assign --name ${functionAppName} --resource-group ${rgname} --role Contributor --scope ${AEGDeadLetterDestinationResourceId}
fi

az keyvault set-policy --name ${keyVaultName} --secret-permissions get --object-id $(az functionapp show --name ${functionAppName} | jq -r '.identity.principalId')

echo "Configuring ${functionAppName}"
az functionapp config appsettings set --name ${functionAppName} --resource-group ${rgname} --settings "${functionsettings[@]}"

echo "Deploying ${functionAppName} as zip"
./retry3.sh az functionapp deployment source config-zip -g ${rgname} -n ${functionAppName} --src "${packagePath}" --timeout 60

defaultHostName=$(az functionapp show --name ${functionAppName} | jq -r '.defaultHostName')
echo "Querying liveness endpoint"
curl  -I -X GET --fail --show-error "https://${defaultHostName}/.well-known/live"