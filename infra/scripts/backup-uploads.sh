#!/usr/bin/env bash
# Usage: infra/scripts/backup-uploads.sh <backup_dir>
set -euo pipefail

BACKUP_DIR="${1:?Usage: backup-uploads.sh <backup_dir>}"
INFRA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVE="uploads-$(date +%Y%m%d-%H%M%S).tar.gz"

mkdir -p "$BACKUP_DIR"
docker compose --env-file "$INFRA_DIR/env/deploy.env" -f "$INFRA_DIR/docker-compose.prod.yml" \
  exec -T backend tar -czf - -C /app uploads > "$BACKUP_DIR/$ARCHIVE"
echo "Saved $BACKUP_DIR/$ARCHIVE"
