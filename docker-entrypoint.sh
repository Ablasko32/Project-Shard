#!/bin/sh
set -e  # Exit immediately if any command fails

# Check if migration have already been executed
if [ ! -f "/app/.migrated" ]; then
  echo "Running database migrations..."
  if ! npx drizzle-kit migrate; then
    echo "Migration failed. Exiting..."
    exit 1
  fi

  echo "Migrations completed."
  touch /app/.migrated
fi;

# Check if the application has already been built
if [ ! -f "/app/.built" ]; then
  echo "Building the application..."
  if ! npm run build; then
    echo "Build failed. Exiting..."
    exit 1
  fi

  echo "Build completed."
  touch /app/.built
fi



echo "Starting application..."
exec "$@"
