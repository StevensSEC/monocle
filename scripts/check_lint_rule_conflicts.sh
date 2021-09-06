#!/bin/bash
set -euxo pipefail

function check_file {
	echo "Checking $1"
	npx eslint-config-prettier-check "$1"
}

export -f check_file
find . -type f -name "*.[tj]s*" -not -path "./node_modules/*" | tr '\n' ' ' | xargs npx eslint-config-prettier
