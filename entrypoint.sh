#!/bin/sh
runtime_config=$(printf '{"BACKEND_URL": "%s"}' "$BACKEND_URL")

escaped_runtime_config=$(printf '%s' "$runtime_config" | sed 's/[\/&]/\\&/g')

sed -i "s/\"import_meta_env_placeholder\"/${escaped_runtime_config}/" /usr/share/nginx/html/index.html

exec nginx -g "daemon off;"
