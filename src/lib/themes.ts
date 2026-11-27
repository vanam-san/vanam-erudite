/**
 * Site theme registry — single source of truth for the theme menu.
 *
 * The built-in entry (`ocean-depths`) is resolved entirely
 * by `src/styles/color.css` via `light-dark()`. The remaining seven entries are
 * website adaptations of the HANCORE-linux Omarchy theme archive
 * (https://github.com/HANCORE-linux/HANCORE-linux/blob/main/THEMES.md).
 *
 * Each HANCORE entry maps its upstream `colors.toml` onto the site's semantic
 * tokens (see `src/styles/themes.css`):
 *
 * - `background` / `foreground` → `--background` / `--foreground`
 * - `accent`                    → `--primary` / `--ring` (and the menu dot)
 * - `secondary` (upstream blue) → `--secondary`
 * - `surface` (upstream lighter) → `--muted`
 * - `mutedText` (upstream muted) → `--muted-foreground` / `--border`
 * - `danger` (upstream red)     → `--destructive`
 * - `onPrimary`                 → `--primary-foreground` (hand-picked per
 *   palette for text-on-accent contrast; light accents get a dark foreground)
 *
 * To add a theme: append an entry here, add a matching
 * `:root[data-palette="<id>"]` block in `src/styles/themes.css`, and include
 * the id in the README theme table. No component changes are needed — the
 * theme menu renders from this list.
 */

/** Light/dark appearance a palette was designed for. */
export type ThemeMode = "light" | "dark"

/** Contrast foreground used for text rendered on the accent color. */
export interface PaletteColors {
  background: string
  foreground: string
  /** Primary accent — buttons, links, focus ring, menu dot. */
  accent: string
  /** Text on top of `accent`. */
  onPrimary: string
  /** Secondary accent (upstream `blue`). */
  secondary: string
  /** Subtle surface (upstream `lighter_background` / selection). */
  surface: string
  /** Secondary text (upstream `muted`). */
  mutedText: string
  /** Errors / destructive actions (upstream `red`). */
  danger: string
}

export interface SiteTheme {
  /** Stable id, persisted to localStorage and set as `data-palette`. */
  id: string
  /** Display name shown in the theme menu. */
  label: string
  /** Designed appearance; synced to `data-theme` for legacy CSS. */
  mode: ThemeMode | "system"
  /** Swatch dot color shown in the theme menu. */
  dot: string
  /** Upstream Omarchy theme repository (omit for built-in themes). */
  repo?: string
  /** Static token overrides. Omit to use the `color.css` defaults. */
  colors?: PaletteColors
}

/** localStorage key for the selected palette id. */
export const THEME_STORAGE_KEY = "theme-palette"

/** Fallback palette when nothing (valid) is stored. */
export const DEFAULT_THEME_ID = "moodpeak"

export const THEMES: readonly SiteTheme[] = [
  {
    id: "ocean-depths",
    label: "Ocean Depths",
    mode: "system",
    dot: "#0891b2",
  },
  {
    id: "banish",
    label: "Banish",
    mode: "dark",
    dot: "#ff2fb3",
    repo: "https://github.com/HANCORE-linux/omarchy-banish-theme",
    colors: {
      background: "#0c0b0d",
      foreground: "#d8d1cc",
      accent: "#ff2fb3",
      onPrimary: "#0c0b0d",
      secondary: "#6c70e0",
      surface: "#19181a",
      mutedText: "#7d8581",
      danger: "#ff4a78",
    },
  },
  {
    id: "harbor",
    label: "Harbor",
    mode: "light",
    dot: "#365b87",
    repo: "https://github.com/HANCORE-linux/omarchy-harbor-theme",
    colors: {
      background: "#dfe4c4",
      foreground: "#1c2d28",
      accent: "#365b87",
      onPrimary: "#ffffff",
      secondary: "#4c6c94",
      surface: "#ecebbd",
      mutedText: "#606c68",
      danger: "#b14752",
    },
  },
  {
    id: "inkypinky",
    label: "InkyPinky",
    mode: "dark",
    dot: "#a795ed",
    repo: "https://github.com/HANCORE-linux/omarchy-inkypinky-theme",
    colors: {
      background: "#13131d",
      foreground: "#c8c8c8",
      accent: "#a795ed",
      onPrimary: "#13131d",
      secondary: "#ea90a8",
      surface: "#222030",
      mutedText: "#817d91",
      danger: "#ea90a8",
    },
  },
  {
    id: "moodpeak",
    label: "Moodpeak",
    mode: "dark",
    dot: "#4ecdc4",
    repo: "https://github.com/HANCORE-linux/omarchy-moodpeak-theme",
    colors: {
      background: "#181c22",
      foreground: "#e0e6ed",
      accent: "#4ecdc4",
      onPrimary: "#181c22",
      secondary: "#6a85ff",
      surface: "#23272d",
      mutedText: "#7b8599",
      danger: "#ff7b92",
    },
  },
  {
    id: "thegreek",
    label: "The Greek",
    mode: "light",
    dot: "#924025",
    repo: "https://github.com/HANCORE-linux/omarchy-thegreek-theme",
    colors: {
      background: "#d0d0c8",
      foreground: "#242424",
      accent: "#924025",
      onPrimary: "#fff9ed",
      secondary: "#2e3125",
      surface: "#dcdcd4",
      mutedText: "#59574d",
      danger: "#db0030",
    },
  },
  {
    id: "turbonite",
    label: "Turbonite",
    mode: "dark",
    dot: "#ed9a1d",
    repo: "https://github.com/HANCORE-linux/omarchy-turbonite-theme",
    colors: {
      background: "#0b0c0c",
      foreground: "#eae9e3",
      accent: "#ed9a1d",
      onPrimary: "#0b0c0c",
      secondary: "#847b4e",
      surface: "#17181a",
      mutedText: "#7f7b71",
      danger: "#f24331",
    },
  },
  {
    id: "whitegold",
    label: "White Gold",
    mode: "light",
    dot: "#005c32",
    repo: "https://github.com/HANCORE-linux/omarchy-whitegold-theme",
    colors: {
      background: "#dedbc8",
      foreground: "#0c0c14",
      accent: "#005c32",
      onPrimary: "#dedbc8",
      secondary: "#725c0a",
      surface: "#e9e6d3",
      mutedText: "#665e4a",
      danger: "#4b0304",
    },
  },
]

/** Lookup helper — returns `undefined` for unknown ids. */
export function getThemeById(id: string): SiteTheme | undefined {
  return THEMES.find((theme) => theme.id === id)
}

/** Narrow an unknown stored value to a known palette, else the default. */
export function resolveThemeId(value: unknown): string {
  return typeof value === "string" && getThemeById(value)
    ? value
    : DEFAULT_THEME_ID
}
