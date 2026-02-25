# MyDesignSystem — Claude Code Context

## Project Overview
A **Slack-inspired mobile design system** built with **React Native + TypeScript** using **Expo**.
Components follow **atomic design principles** (atoms → molecules → organisms).

## Tech Stack
- React Native + Expo (TypeScript)
- No external UI libraries — all components are custom
- Theming via React Context (light/dark mode)

## Design Language
- Inspired by **Slack's visual style**: purple primary, green presence/success, clean grays
- **4pt spacing grid** — all spacing values are multiples of 4
- **Accessible** — proper contrast ratios, hit targets ≥ 44pt

## Folder Structure
```
src/
  tokens/          # colors, typography, spacing, shadows
  components/
    atoms/         # Button, Icon, Avatar, Badge, Input
    molecules/     # ListItem, MessageBubble, FormField
    organisms/     # ChannelList, MessageThread, Header
  theme/           # ThemeProvider, useTheme hook
  storybook/       # Component stories for visual testing
```

## Conventions
- All components accept a `style` prop for overrides
- Use `useTheme()` hook to access tokens — never hardcode colors
- Export everything via barrel `index.ts` files
- Props interfaces named `{ComponentName}Props`
- Variants use union string literals (e.g. `'primary' | 'secondary'`)
