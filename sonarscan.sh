#!/bin/bash
../sonarqube/scanner/sonar-scanner-cli-linux/bin/sonar-scanner -D"sonar.projectKey=asp_final" -D"sonar.sources=." -D="sonar.exclusions=./lib/**,./unittest/**" -D"sonar.host.url=http://localhost:9000" -D"sonar.login=8e0874081eedaeaecce73d8418136a78464726a3"
