

#!/bin/bash
set -Eeuxo pipefail



echo "Deploying DotNetDevOps.Extensions.AzureEventGrid.EventManagerHost"
functionAppName="${prefixShort}-WebApp-${projectName}-AEG-EventManager-${locationShort}-${projectEnv}"
storageAccountName="stgaegem"
packagePath="${publishFolder}/DotNetDevOps.Extensions.AzureEventGrid.EventManagerHost.zip"
functionsettings=(
	"PERSISTANT_STORAGE=@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=storage-${accountName})"
	"TestAppSetting=TEST"
)

source utils/helper_azurefunction.sh;

