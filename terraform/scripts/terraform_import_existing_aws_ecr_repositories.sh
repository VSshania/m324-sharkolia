#!/bin/bash

# INFO: 2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ecr describe-repositories 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -r ".repositories[].repositoryName" | while read -r repositoryName; do
    case "$repositoryName" in
      "m324/myapp")
        terraform import aws_ecr_repository.myecr "$repositoryName" 2>&1
        ;;
      "m324/myapp-backend")
        terraform import aws_ecr_repository.myecr_backend "$repositoryName" 2>&1
        ;;
    esac
  done
fi
