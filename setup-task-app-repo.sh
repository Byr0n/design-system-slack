#!/usr/bin/env bash
# setup-task-app-repo.sh
#
# Bootstraps https://github.com/Byr0n/task-app from the design-system-slack
# branch that contains the task-app source code.
#
# Usage:
#   chmod +x setup-task-app-repo.sh
#   ./setup-task-app-repo.sh
#
# Prerequisites: git, node/npm (for a quick sanity-check install)

set -euo pipefail

DESIGN_SYSTEM_REPO="https://github.com/Byr0n/design-system-slack.git"
DESIGN_SYSTEM_BRANCH="claude/mobile-task-tracking-app-Vv8Xp"
TASK_APP_REPO="https://github.com/Byr0n/task-app.git"
TASK_APP_DIR="task-app"
WORK_DIR="$(mktemp -d)"

echo "==> Cloning design-system-slack (branch: $DESIGN_SYSTEM_BRANCH)…"
git clone --depth 1 --branch "$DESIGN_SYSTEM_BRANCH" "$DESIGN_SYSTEM_REPO" "$WORK_DIR/design-system-slack"
DS="$WORK_DIR/design-system-slack"

echo "==> Cloning task-app repo…"
git clone "$TASK_APP_REPO" "$TASK_APP_DIR"
TA="$TASK_APP_DIR"

# ── Source files ─────────────────────────────────────────────────────────────
echo "==> Copying source files…"

# Root files
cp "$DS/App.tsx"         "$TA/App.tsx"
cp "$DS/index.ts"        "$TA/index.ts"
cp "$DS/tsconfig.json"   "$TA/tsconfig.json"
cp "$DS/babel.config.js" "$TA/babel.config.js"

# Assets
cp -r "$DS/assets" "$TA/assets"

# Design-system source (no storybook)
mkdir -p "$TA/src/components"
cp -r "$DS/src/tokens"   "$TA/src/tokens"
cp -r "$DS/src/theme"    "$TA/src/theme"
cp    "$DS/src/index.ts" "$TA/src/index.ts"

for layer in atoms molecules organisms; do
  src_dir="$DS/src/components/$layer"
  dst_dir="$TA/src/components/$layer"
  mkdir -p "$dst_dir"
  # Copy everything except *.stories.* files
  find "$src_dir" -maxdepth 1 -type f ! -name "*.stories.*" -exec cp {} "$dst_dir/" \;
done
cp "$DS/src/components/index.ts" "$TA/src/components/index.ts"

# Task-app source
cp -r "$DS/src/task-app" "$TA/src/task-app"

# ── Generated config files ────────────────────────────────────────────────────
echo "==> Writing package.json…"
cat > "$TA/package.json" << 'PKGJSON'
{
  "name": "task-app",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@gorhom/bottom-sheet": "^4.6.4",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-native-community/datetimepicker": "^8.4.4",
    "@react-native-community/slider": "^5.0.1",
    "expo": "~54.0.33",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "typescript": "~5.9.2"
  },
  "private": true
}
PKGJSON

echo "==> Writing app.json…"
cat > "$TA/app.json" << 'APPJSON'
{
  "expo": {
    "name": "Task App",
    "slug": "task-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "bundler": "metro",
      "favicon": "./assets/favicon.png"
    },
    "experiments": {
      "baseUrl": "/task-app"
    }
  }
}
APPJSON

echo "==> Writing metro.config.js…"
cat > "$TA/metro.config.js" << 'METRO'
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
METRO

echo "==> Writing GitHub Actions deploy workflow…"
mkdir -p "$TA/.github/workflows"
cat > "$TA/.github/workflows/deploy.yml" << 'WORKFLOW'
name: Deploy Task App to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  contents: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Export Expo web build
        run: npx expo export --platform web

      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
WORKFLOW

# ── Commit & push ─────────────────────────────────────────────────────────────
echo "==> Committing and pushing…"
cd "$TA"
git add -A
git commit -m "Initial commit — task tracking app

Standalone Expo React Native app built on the Slack-inspired design system.
Features:
- Epics: large tasks with sub-tasks, status, due dates, progress bar
- Quick Hits: lightweight tasks with one-tap completion and due dates
- Collaborators: add by email or phone number via bottom sheet
- GitHub Actions workflow deploys to gh-pages on push to master"

git push -u origin master

echo ""
echo "✓ Done! task-app is ready at $TASK_APP_REPO"
echo ""
echo "Next steps:"
echo "  1. Go to https://github.com/Byr0n/task-app/settings/pages"
echo "     → Source: Deploy from a branch → Branch: gh-pages / root"
echo "  2. Push any change to master to trigger the first deploy"
echo "  3. Your app will be live at: https://byr0n.github.io/task-app/"
echo ""

# Clean up temp clone
rm -rf "$WORK_DIR"
