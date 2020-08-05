

#!/bin/bash
set -Eeuxo pipefail



echo "Deploying DotNetDevOps.Extensions.AzureEventGrid.EventManagerHost"
functionAppName="${BusinessPrefix}-WebApp-${projectName}-AEG-EventManager-${locationShort}-${projectEnv}"
storageAccountName="stgaegem"
packagePath="${publishFolder}/DotNetDevOps.Extensions.AzureEventGrid.EventManagerHost.zip"
functionsettings=(
	"PERSISTANT_STORAGE=@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=storage-${accountName})"
	"TestAppSetting=TEST",
	"PackageVersion=${PackageVersion}"
)

source azure/utils/helper_azurefunction.sh;

