#!/bin/bash
set -Eeuxo pipefail

unzip package.zip -d .

echo ${message}
echo $(ls)

az extension add --name application-insights


EnvProjectName=$(echo "${projectName}-${locationShort}-${projectEnv}"  | sed 's/[- 0-9]*$//' | sed 's/[- 0-9]*//')

#Set default location and ResourceGroup name
az configure --defaults location=${location} group=${rgname}

#Create App Insights for monitoring
appInsightsName="${AIPrefix}-${EnvProjectName}"
instrumentationKey=$(az monitor app-insights component create --app "${appInsightsName}" | jq -r '.instrumentationKey')


#Create keyVault and trim projectname to be shorter then 24 length name
keyVaultName=$(echo "${BusinessPrefix}-${KeyVaultResourceNamePrefix}-${projectName}-${locationShort}${projectEnv}" | sed 's/[- 0-9]*$//' | sed 's/[- 0-9]*//' | awk '{print tolower($0)}')
keyVaultNameLength=$(expr length "${keyVaultName}")

if [ ${keyVaultNameLength} -gt 23 ]
then
    COUNT=`expr ${keyVaultNameLength} - 23`
	kvnshort=$(echo "${projectName}" | rev | cut -c ${COUNT}- | rev)
    keyVaultName=$(echo "${BusinessPrefix}-${KeyVaultResourceNamePrefix}-${kvnshort}-${locationShort}${projectEnv}" | sed 's/[- 0-9]*$//' | sed 's/[- 0-9]*//' | awk '{print tolower($0)}')
fi

isKeyVaultDeleted=$(az keyvault list-deleted --query "[?name == '$keyVaultName']")
if [[ "${isKeyVaultDeleted}" != "[]" ]]; then
az keyvault purge --name $$keyVaultName
fi

doKeyVaultExist=$(az keyvault list --query "[?name == '$keyVaultName']")

if [[ "${doKeyVaultExist}" = "[]" ]]; then
keyVaultId=$(az keyvault create \
	--name ${keyVaultName} \
	--enable-soft-delete true \
    --retention-days 7 \
	--no-self-perms \
	--enabled-for-template-deployment | jq -r '.id')
fi

az keyvault set-policy --name ${keyVaultName} --secret-permissions get set list --object-id ${UserManagedPrincipalId}

#Create Storage Account (all lower case)
accountName=$(echo "${BusinessPrefix}${projectName}${locationShort}${projectEnv}" | sed 's/-//g' | awk '{print tolower($0)}')
accountNameLength=$(expr length "${accountName}")

if [ ${accountNameLength} -gt 23 ]
then
    COUNT=`expr ${accountNameLength} - 23`
	acnshort=$(echo "${projectName}" | rev | cut -c ${COUNT}- | rev)
	accountName=$(echo "${BusinessPrefix}${acnshort}${locationShort}${projectEnv}" | sed 's/-//g' | awk '{print tolower($0)}')
fi


az storage account create -n ${accountName} --sku Standard_LRS --kind StorageV2



#SetOrGet the storage key into a secret named AzureWebJobsStorage
doSecretExists=$(az keyvault secret list --vault-name $keyVaultName --query "[?name == 'storage-${accountName}']")
current_env_conn_string=$(az storage account show-connection-string -n ${accountName} --query 'connectionString' -o tsv)

if [[ "${doKeyVaultExist}" = "[]" ]]; then
	secretUriWithVersion=$(az keyvault secret set --name storage-${accountName} --vault-name ${keyVaultName} --value ${current_env_conn_string} | jq -r '.id')
else 
	current_account_fromvault_conn_string=$(az keyvault secret show --name storage-${accountName} --vault-name ${keyVaultName} --query 'value' -o tsv)
	if [ "$current_account_fromvault_conn_string" = "$current_env_conn_string" ]; then
		secretUriWithVersion=$(az keyvault secret show --name storage-${accountName} --vault-name ${keyVaultName} --query 'id' -o tsv)
	else
	secretUriWithVersion=$(az keyvault secret set --name storage-${accountName} --vault-name ${keyVaultName} --value ${current_env_conn_string} | jq -r '.id')
	fi
fi

source steps/deployHost.sh;