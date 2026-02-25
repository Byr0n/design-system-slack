# MyDesignSystem — Claude Code Context

## Project Overview

A **Slack-inspired mobile design system** built with **React Native + TypeScript** using **Expo**.
Components follow **atomic design principles** (atoms → molecules → organisms).
The system provides a complete, theme-aware component library with no external UI dependencies.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.81.5 + Expo ~54.0.33 |
| Language | TypeScript ~5.9.2 (strict mode) |
| UI Libraries | None — all components are custom primitives |
| Theming | React Context (`ThemeProvider` + `useTheme()`) |
| Animation | `react-native-reanimated` ~4.1.1 + `Animated` API |
| Gestures | `react-native-gesture-handler` ~2.28.0 |
| Bottom Sheets | `@gorhom/bottom-sheet` ^4.6.4 |
| Web Storybook | `@storybook/react-vite` (Vite ^6.4.1) |
| Native Storybook | `@storybook/react-native` |

## Design Language

- Inspired by **Slack's visual style**: Aubergine purple (#611F69) primary, green (#007A5A) success
- **4pt spacing grid** — every spacing value is a multiple of 4
- **Accessible** — contrast ratios enforced via semantic tokens, minimum touch targets ≥ 44pt
- Cross-platform shadows: iOS (`shadowOffset`/`shadowOpacity`/`shadowRadius`) vs Android (`elevation`)

## Folder Structure

```
/
├── App.tsx                        # Root component (ThemeProvider + ToastProvider)
├── index.ts                       # Expo entry (registerRootComponent)
├── app.json                       # Expo config (name, orientation, new arch, web)
├── babel.config.js                # babel-preset-expo; reanimated/plugin LAST
├── metro.config.js                # withStorybook middleware (env-gated)
├── tsconfig.json                  # extends expo/tsconfig.base, strict: true
├── .storybook/                    # Web Storybook config (Vite, react-native-web aliases)
├── .rnstorybook/                  # React Native Storybook config (on-device)
└── src/
    ├── index.ts                   # Main barrel — re-exports everything
    ├── tokens/
    │   ├── colors.ts              # Palette (14 families × 9 shades) + semantic light/dark maps
    │   ├── typography.ts          # Font families, sizes (xs–5xl), weights, line-heights, text styles
    │   ├── spacing.ts             # 4pt grid scale, named aliases (space.*), radii, icon sizes, hitSlop
    │   ├── shadows.ts             # 7 elevation levels (none → 2xl), iOS + Android
    │   └── index.ts
    ├── theme/
    │   ├── ThemeProvider.tsx      # Context, useTheme() hook, ThemeMode ('light'|'dark'|'system')
    │   └── index.ts
    ├── components/
    │   ├── index.ts               # Re-exports atoms + molecules + organisms
    │   ├── atoms/                 # Indivisible building blocks
    │   │   ├── Button.tsx         # variant × size; loading, disabled, fullWidth
    │   │   ├── Avatar.tsx         # image or initials fallback; presence dot
    │   │   ├── Badge.tsx          # count / dot; 6 color variants
    │   │   ├── Input.tsx          # forwardRef; label, helper/error text, icons, clearable
    │   │   ├── Card.tsx           # elevation wrapper with hairline border
    │   │   ├── Divider.tsx        # horizontal / vertical with optional label
    │   │   └── index.ts
    │   ├── molecules/             # Compositions of atoms + domain logic
    │   │   ├── ListItem.tsx       # Avatar or icon left; badge/right content; selection state
    │   │   ├── MessageBubble.tsx  # sent/received variants; reactions; edited label
    │   │   ├── FormField.tsx      # Input wrapper with required indicator and hint
    │   │   └── index.ts
    │   └── organisms/             # Feature-level, self-contained components
    │       ├── Header.tsx         # Brand top bar; left action; multiple right actions
    │       ├── ChannelList.tsx    # FlatList of channels/DMs with section headers
    │       ├── MessageThread.tsx  # FlatList chat with date dividers; auto-scroll
    │       ├── Toast.tsx          # ToastProvider + useToast() hook; animated; 5 variants
    │       ├── BottomSheet.tsx    # Spring-animated slide-up; drag handle; % or px height
    │       ├── ActionSheet.tsx    # iOS-style action menu; destructive/disabled actions
    │       ├── Tooltip.tsx        # 4-placement contextual popup; modal-rendered; arrow
    │       └── index.ts
    └── storybook/
        ├── ShowcaseScreen.tsx     # Demo/preview screen for Expo app
        ├── AvatarStory.tsx
        ├── ButtonStory.tsx
        ├── ComponentsStory.tsx
        ├── TokensStory.tsx
        └── index.ts
```

## Development Workflows

### Running the App

```bash
npm start          # Expo dev server (Metro)
npm run android    # Android emulator/device
npm run ios        # iOS simulator/device
npm run web        # Web via react-native-web
```

### Storybook

```bash
# Web Storybook (browser, hot-reload)
npm run storybook          # http://localhost:6006
npm run build-storybook    # static build

# React Native Storybook (on-device)
EXPO_PUBLIC_STORYBOOK=true npm start
```

`App.tsx` gates on `process.env.EXPO_PUBLIC_STORYBOOK === 'true'` to swap in the
RN Storybook root, so you never need separate entry files.

### Adding a New Component

1. Place it in the correct layer (`atoms/`, `molecules/`, `organisms/`).
2. Export it from the layer's `index.ts` barrel.
3. Add a `.stories.tsx` file alongside it following the pattern below.
4. Never hardcode colors — use `useTheme()`.

## Key Conventions

### Props Interfaces

```typescript
// Always name it {ComponentName}Props
export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;   // union string literal
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;  // all components accept style overrides
}
```

### Theme Access

```typescript
// Always destructure from useTheme() — never hardcode colors or spacing
const { colors, space, radii, textStyles, shadows, isDark } = useTheme();
```

Available tokens on the theme object:

| Token | Source file | Examples |
|---|---|---|
| `colors` | `tokens/colors.ts` | `colors.interactivePrimary`, `colors.textBrand`, `colors.statusSuccess` |
| `space` | `tokens/spacing.ts` | `space.xs` (4), `space.sm` (8), `space.md` (16), `space.lg` (24) |
| `spacing` | `tokens/spacing.ts` | numeric scale object (0–128) |
| `radii` | `tokens/spacing.ts` | `radii.sm` (4), `radii.md` (8), `radii.lg` (12), `radii.full` (9999) |
| `iconSizes` | `tokens/spacing.ts` | `iconSizes.sm` (16), `iconSizes.md` (24), `iconSizes.lg` (32) |
| `textStyles` | `tokens/typography.ts` | `textStyles.bodyMD`, `textStyles.labelLG`, `textStyles.headingSM` |
| `fontSizes` | `tokens/typography.ts` | `fontSizes.sm` (13), `fontSizes.md` (15), `fontSizes.lg` (17) |
| `shadows` | `tokens/shadows.ts` | `shadows.sm`, `shadows.md`, `shadows.xl` |
| `isDark` | computed | boolean |
| `mode` | state | `'light' \| 'dark' \| 'system'` |
| `setMode` | fn | `(mode: ThemeMode) => void` |

### Variant Pattern

```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

// Use a helper function — not a switch inside JSX
function variantContainerStyles(variant: ButtonVariant, colors: SemanticColors) {
  switch (variant) {
    case 'secondary': return { backgroundColor: colors.interactiveSecondary, ... };
    case 'ghost':     return { backgroundColor: 'transparent' };
    case 'destructive': return { backgroundColor: colors.interactiveDanger };
    default:          return { backgroundColor: colors.interactivePrimary };
  }
}
```

### Size Mapping Pattern

```typescript
const SIZES: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
const dim = SIZES[size];
```

### Styling Approach

```typescript
// Base static styles — one StyleSheet.create per file
const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center' },
});

// Merge dynamic theme-driven styles with StyleSheet.flatten
const merged = StyleSheet.flatten([
  styles.base,
  { borderRadius: radii.md, backgroundColor: colors.surface },
  style,  // consumer override always last
]);
```

Use `StyleSheet.hairlineWidth` for borders that look crisp on all pixel densities.

### Accessibility Requirements

- All interactive components must have `accessibilityRole`
- Use `accessibilityLabel` for icon-only buttons and non-obvious elements
- Set `accessibilityState={{ disabled, busy }}` where applicable
- Minimum touch target: 44pt height (enforced via `minHeight` or `hitSlop`)
- `hitSlop` constants are defined in `tokens/spacing.ts` as `hitSlop.sm/md/lg`
- Toast uses `accessibilityLiveRegion="polite"`

### forwardRef Components

```typescript
// Input uses forwardRef so callers can focus the TextInput
export const Input = forwardRef<TextInput, InputProps>(
  function Input(props, ref) { ... }
);
```

### Context Providers

Two providers must wrap the app (see `App.tsx`):

```tsx
<ThemeProvider initialMode="system">
  <ToastProvider>
    {/* app content */}
  </ToastProvider>
</ThemeProvider>
```

`useTheme()` throws if called outside `ThemeProvider`.
`useToast()` throws if called outside `ToastProvider`.

## Storybook Story Pattern

```typescript
// src/components/atoms/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',   // path mirrors folder: Atoms/ Molecules/ Organisms/
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { label: 'Button', variant: 'primary', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Loading: Story = { args: { loading: true } };
```

Stories are auto-wrapped with `ThemeProvider` via the global decorators in
`.storybook/preview.tsx` and `.rnstorybook/preview.tsx`.

## Color Token Reference

Semantic color names follow this pattern: `{category}{Qualifier}` in camelCase.

| Category | Examples |
|---|---|
| Text | `textPrimary`, `textSecondary`, `textMuted`, `textBrand`, `textInverse`, `textLink` |
| Background | `bgPrimary`, `bgSecondary`, `bgBrand`, `bgOverlay` |
| Surface | `surface`, `surfaceRaised`, `surfaceSunken` |
| Border | `borderDefault`, `borderSubtle`, `borderStrong` |
| Interactive | `interactivePrimary`, `interactiveSecondary`, `interactiveDanger`, `interactiveHover` |
| Status | `statusSuccess`, `statusWarning`, `statusDanger`, `statusInfo` |
| Presence | `presenceOnline`, `presenceAway`, `presenceDnd`, `presenceOffline` |
| Icon | `iconPrimary`, `iconSecondary`, `iconMuted`, `iconBrand` |

All tokens resolve to different hex values depending on `isDark`.

## Build & Bundler Notes

**babel.config.js** — `react-native-reanimated/plugin` **must be the last plugin** in the array or animations will break.

**metro.config.js** — `withStorybook` middleware is only active when
`EXPO_PUBLIC_STORYBOOK === 'true'`. Do not remove this guard.

**`.storybook/main.ts`** — Vite aliases `react-native` → `react-native-web` and
deduplicates `react`/`react-dom` to prevent the "multiple React instances" error
that arises from React 19 + Vite.

## What Does Not Exist Yet

- No ESLint or Prettier configuration (no `.eslintrc`, `.prettierrc`)
- No unit or integration tests (no Jest setup)
- No CI linting step — only GitHub Pages deployment for Storybook
- `Icon` atom referenced in CLAUDE.md folder structure but not yet implemented

When adding these, follow the patterns established above and update this file.
