# setup.sh
#!/bin/bash
if [ ! -f ".env" ]; then
    echo "❌ .env not found"
    exit 1
fi

while IFS='=' read -r key value || [ -n "$key" ]; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)
    value="${value%\"}"; value="${value#\"}"
    value="${value%\'}"; value="${value#\'}"

    export "$key=$value"
    echo "✅ $key=$value"
done < .env
