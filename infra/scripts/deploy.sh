#!/usr/bin/env bash
# Usage: infra/scripts/deploy.sh [uploads_source_dir]
set -euo pipefail

INFRA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$INFRA_DIR/env/deploy.env"
UPLOADS_SOURCE="${1:-}"

compose() {
  docker compose --env-file "$ENV_FILE" -f "$INFRA_DIR/docker-compose.prod.yml" "$@"
}

git -C "$INFRA_DIR/.." pull --ff-only
compose build backend frontend tools
compose run --rm tools
compose up -d --remove-orphans backend

if [[ -n "$UPLOADS_SOURCE" ]]; then
  compose cp "$UPLOADS_SOURCE/." backend:/app/uploads
  compose exec -T --user root backend chown -R node:node /app/uploads
fi

compose up -d --remove-orphans

# shellcheck disable=SC1090
source "$ENV_FILE"
for _ in {1..30}; do
  if [[ "$(compose ps --status running --format '{{.Health}}' | sort -u)" == "healthy" ]]; then
    echo "Deployed: all services are healthy at $SITE_URL"
    exit 0
  fi
  sleep 5
done

compose ps
echo "A service did not become healthy. See: docker compose logs" >&2
exit 1
