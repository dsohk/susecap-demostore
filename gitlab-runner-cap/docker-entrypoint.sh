#!/bin/bash
###################################################################################################
# HELPERS
###################################################################################################

# exit_with_failure() outputs a message before exiting the script
function exit_with_failure() {
    echo "FAILURE: $1"
    exit 9
}

# command_exists() tells if a given command exists.
function command_exists() {
    command -v "$1" >/dev/null 2>&1
}

###################################################################################################
# MAIN
###################################################################################################

echo "[Entrypoint] GitLab Runner Docker Image optimized for Cloud Foundry"

if ! command_exists curl; then
    exit_with_failure "'curl' is needed. Please install 'curl'."
fi
if [ -z "$API_RUNNER_URL" ]; then
    exit_with_failure 'API_RUNNER_URL is missing'
fi
if [ -z "$API_PRIVATE_TOKEN" ]; then
    exit_with_failure 'API_PRIVATE_TOKEN is missing'
fi
if [ -z "$CI_SERVER_URL" ]; then
    exit_with_failure 'CI_SERVER_URL is missing'
fi
if [ -z "$RUNNER_NAME" ]; then
    exit_with_failure 'RUNNER_NAME is missing'
fi
if [ -z "$REGISTRATION_TOKEN" ]; then
    exit_with_failure 'REGISTRATION_TOKEN is missing'
fi
if [ -z "$RUNNER_EXECUTOR" ]; then
    export RUNNER_EXECUTOR="shell"
fi

echo "Register GitLab Runner with Name $RUNNER_NAME"
if curl -s --header "Private-Token: $API_PRIVATE_TOKEN" "$API_RUNNER_URL" | grep "description\":\"$RUNNER_NAME\""; then
    exit_with_failure "GitLab Runner with name $RUNNER_NAME already registered"
else
    if gitlab-runner register --non-interactive; then
        echo "GitLab Runner successfully registered"
    else
        exit_with_failure "GitLab Runner not registered"
    fi
fi

echo "Start GitLab Runner"
gitlab-runner "$@"