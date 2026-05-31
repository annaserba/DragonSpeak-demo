#!/bin/bash
set -e
if [ ! -d "../DragonSpeak" ]; then
  echo "Cloning DragonSpeak template..."
  git clone --depth 1 https://github.com/annaserba/DragonSpeak.git ../DragonSpeak 2>/dev/null || {
    echo "WARNING: Could not clone DragonSpeak template. Skipping."
    exit 0
  }
fi
echo "Installing template dependencies..."
(cd ../DragonSpeak && npm install) || true
echo "Linking dragonpeak package..."
mkdir -p node_modules
ln -sf ../../DragonSpeak/packages/dragonspeak node_modules/dragonspeak 2>/dev/null || true
