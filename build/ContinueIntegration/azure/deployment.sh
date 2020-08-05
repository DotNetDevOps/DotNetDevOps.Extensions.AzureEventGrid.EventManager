#!/bin/bash
set -Eeuxo pipefail

unzip package.zip -d /opt

echo ${message}
echo $(ls)