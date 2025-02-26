#!/bin/sh
set -e  # Exit immediately if any command fails

# Check if migration and build have already been executed
if [ ! -f "/app/.migrated" ]; then
  echo "Running database migrations..."
  if ! npx drizzle-kit migrate; then
    echo "Migration failed. Exiting..."
    exit 1
  fi
  echo "Migrations completed."

  echo "Building the application..."
  if ! npm run build; then
    echo "Build failed. Exiting..."
    exit 1
  fi
  echo "Build completed."

  # Create a marker file to indicate migrations and build are done
  touch /app/.migrated
fi



echo "Starting application..."
exec "$@"
