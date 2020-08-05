#!/bin/bash
set -Eeuxo pipefail

unzip package.zip -d .

source azure/main.sh;