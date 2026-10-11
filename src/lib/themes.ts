/**
 * Site theme registry — single source of truth for the theme menu.
 *
 * The built-in entry (`ocean-depths`) is resolved entirely
 * by `src/styles/color.css` via `light-dark()`. The remaining 28 entries are
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
    id: "batou",
    label: "Batou",
    mode: "dark",
    dot: "#605d5b",
    repo: "https://github.com/HANCORE-linux/omarchy-batou-theme",
    colors: {
      background: "#121212",
      foreground: "#a4a4a4",
      accent: "#605d5b",
      onPrimary: "#ffffff",
      secondary: "#c2bbb0",
      surface: "#1a1a1e",
      mutedText: "#626a78",
      danger: "#e19e74",
    },
  },
  {
    id: "blackgold",
    label: "BlackGold",
    mode: "dark",
    dot: "#6e6a58",
    repo: "https://github.com/HANCORE-linux/omarchy-blackgold-theme",
    colors: {
      background: "#0d0d0d",
      foreground: "#ebdbb2",
      accent: "#6e6a58",
      onPrimary: "#f6f1dd",
      secondary: "#bfa75d",
      surface: "#1f1a12",
      mutedText: "#807c6d",
      danger: "#d35f5f",
    },
  },
  {
    id: "blackmoney",
    label: "BlackMoney",
    mode: "dark",
    dot: "#d8d4b4",
    repo: "https://github.com/HANCORE-linux/omarchy-blackmoney-theme",
    colors: {
      background: "#0c0c0c",
      foreground: "#d8d4b4",
      accent: "#d8d4b4",
      onPrimary: "#0c0c0c",
      secondary: "#88c6a3",
      surface: "#262626",
      mutedText: "#797d66",
      danger: "#dd5670",
    },
  },
  {
    id: "blackturq",
    label: "BlackTurq",
    mode: "dark",
    dot: "#adf0e9",
    repo: "https://github.com/HANCORE-linux/omarchy-blackturq-theme",
    colors: {
      background: "#0a0a0a",
      foreground: "#c8dcdc",
      accent: "#adf0e9",
      onPrimary: "#0a0a0a",
      secondary: "#8fecd5",
      surface: "#14201e",
      mutedText: "#647f7f",
      danger: "#d35f5f",
    },
  },
  {
    id: "demon",
    label: "Demon",
    mode: "dark",
    dot: "#5c624b",
    repo: "https://github.com/HANCORE-linux/omarchy-demon-theme",
    colors: {
      background: "#0f0f0f",
      foreground: "#e0d4c2",
      accent: "#5c624b",
      onPrimary: "#e0d4c2",
      secondary: "#ff4500",
      surface: "#171817",
      mutedText: "#6b6867",
      danger: "#bb1c1c",
    },
  },
  {
    id: "dos-moos",
    label: "Dos-Moos",
    mode: "dark",
    dot: "#819890",
    repo: "https://github.com/HANCORE-linux/omarchy-dos-moos-theme",
    colors: {
      background: "#131516",
      foreground: "#f8ebe3",
      accent: "#819890",
      onPrimary: "#131516",
      secondary: "#a5b5ab",
      surface: "#1c2224",
      mutedText: "#72856c",
      danger: "#f0334a",
    },
  },
  {
    id: "greek-noir",
    label: "Greek Noir",
    mode: "dark",
    dot: "#f25623",
    repo: "https://github.com/HANCORE-linux/omarchy-greek-noir-theme",
    colors: {
      background: "#171717",
      foreground: "#ccd0cf",
      accent: "#f25623",
      onPrimary: "#171717",
      secondary: "#88a57d",
      surface: "#222222",
      mutedText: "#7d837d",
      danger: "#f25623",
    },
  },
  {
    id: "harbor",
    label: "Harbor",
    mode: "light",
    dot: "#5e81ac",
    repo: "https://github.com/HANCORE-linux/omarchy-harbor-theme",
    colors: {
      background: "#dfe4c4",
      foreground: "#1c2d28",
      accent: "#5e81ac",
      onPrimary: "#ffffff",
      secondary: "#4c6c94",
      surface: "#ecebbd",
      mutedText: "#606c68",
      danger: "#b14752",
    },
  },
  {
    id: "harbordark",
    label: "Harbor Dark",
    mode: "dark",
    dot: "#e75a50",
    repo: "https://github.com/HANCORE-linux/omarchy-harbordark-theme",
    colors: {
      background: "#1b1b1b",
      foreground: "#efebdc",
      accent: "#e75a50",
      onPrimary: "#1b1b1b",
      secondary: "#e58980",
      surface: "#262626",
      mutedText: "#89856b",
      danger: "#f44336",
    },
  },
  {
    id: "inkypinky",
    label: "InkyPinky",
    mode: "dark",
    dot: "#7c7ca8",
    repo: "https://github.com/HANCORE-linux/omarchy-inkypinky-theme",
    colors: {
      background: "#13131d",
      foreground: "#c8c8c8",
      accent: "#7c7ca8",
      onPrimary: "#13131d",
      secondary: "#ea90a8",
      surface: "#222030",
      mutedText: "#817d91",
      danger: "#ea90a8",
    },
  },
  {
    id: "kanso",
    label: "Kansō",
    mode: "dark",
    dot: "#8ba4b0",
    repo: "https://github.com/HANCORE-linux/omarchy-kanso-theme",
    colors: {
      background: "#090e13",
      foreground: "#c5c9c7",
      accent: "#8ba4b0",
      onPrimary: "#090e13",
      secondary: "#8a9a7b",
      surface: "#1c1e25",
      mutedText: "#797d82",
      danger: "#c4746e",
    },
  },
  {
    id: "labra",
    label: "Labra",
    mode: "dark",
    dot: "#e33d84",
    repo: "https://github.com/HANCORE-linux/omarchy-labra-theme",
    colors: {
      background: "#040704",
      foreground: "#d3d7b5",
      accent: "#e33d84",
      onPrimary: "#ffffff",
      secondary: "#d3dd2c",
      surface: "#1d201d",
      mutedText: "#585d58",
      danger: "#ee585d",
    },
  },
  {
    id: "lasthorizon",
    label: "Last Horizon",
    mode: "dark",
    dot: "#d7857f",
    repo: "https://github.com/HANCORE-linux/omarchy-lasthorizon-theme",
    colors: {
      background: "#1f211b",
      foreground: "#ffffff",
      accent: "#d7857f",
      onPrimary: "#1f211b",
      secondary: "#f7d1ab",
      surface: "#2a2d24",
      mutedText: "#a8aca0",
      danger: "#d75450",
    },
  },
  {
    id: "mechanoonna",
    label: "Mecha no Onna",
    mode: "dark",
    dot: "#d4bd99",
    repo: "https://github.com/HANCORE-linux/omarchy-mechanoonna-theme",
    colors: {
      background: "#1c1b19",
      foreground: "#f0e4c5",
      accent: "#d4bd99",
      onPrimary: "#1c1b19",
      secondary: "#a89984",
      surface: "#232220",
      mutedText: "#8e8373",
      danger: "#c5564a",
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
    id: "oxford",
    label: "Oxford",
    mode: "dark",
    dot: "#bda07f",
    repo: "https://github.com/HANCORE-linux/omarchy-oxford-theme",
    colors: {
      background: "#292b31",
      foreground: "#d6d1c9",
      accent: "#bda07f",
      onPrimary: "#292b31",
      secondary: "#dd5544",
      surface: "#33353b",
      mutedText: "#999388",
      danger: "#dd5544",
    },
  },
  {
    id: "oxocarbon",
    label: "Oxocarbon",
    mode: "dark",
    dot: "#33b1ff",
    repo: "https://github.com/HANCORE-linux/omarchy-oxocarbon-theme",
    colors: {
      background: "#161616",
      foreground: "#f2f4f8",
      accent: "#33b1ff",
      onPrimary: "#161616",
      secondary: "#42be65",
      surface: "#262626",
      mutedText: "#838486",
      danger: "#ee5396",
    },
  },
  {
    id: "roseofdune",
    label: "Rose of Dune",
    mode: "light",
    dot: "#76634c",
    repo: "https://github.com/HANCORE-linux/omarchy-roseofdune-theme",
    colors: {
      background: "#f5e6d3",
      foreground: "#35302a",
      accent: "#76634c",
      onPrimary: "#f5e6d3",
      secondary: "#9e4f5b",
      surface: "#fdf7ee",
      mutedText: "#756454",
      danger: "#a02b16",
    },
  },
  {
    id: "ryu",
    label: "Ryū",
    mode: "dark",
    dot: "#525e5a",
    repo: "https://github.com/HANCORE-linux/omarchy-ryu-theme",
    colors: {
      background: "#050505",
      foreground: "#d6d0c5",
      accent: "#525e5a",
      onPrimary: "#fff9ed",
      secondary: "#75897f",
      surface: "#141414",
      mutedText: "#7b7873",
      danger: "#da614e",
    },
  },
  {
    id: "saga",
    label: "Saga",
    mode: "dark",
    dot: "#b2fff3",
    repo: "https://github.com/HANCORE-linux/omarchy-saga-theme",
    colors: {
      background: "#05080a",
      foreground: "#fff6ff",
      accent: "#b2fff3",
      onPrimary: "#05080a",
      secondary: "#ff9fbc",
      surface: "#1a1727",
      mutedText: "#767982",
      danger: "#ff9fbc",
    },
  },
  {
    id: "sapphire",
    label: "Sapphire",
    mode: "dark",
    dot: "#f7c3c6",
    repo: "https://github.com/HANCORE-linux/omarchy-sapphire-theme",
    colors: {
      background: "#060d1f",
      foreground: "#e0f7fa",
      accent: "#f7c3c6",
      onPrimary: "#060d1f",
      secondary: "#6488ea",
      surface: "#151b26",
      mutedText: "#7576b6",
      danger: "#e95c4b",
    },
  },
  {
    id: "shadesofjade",
    label: "Shades of Jade",
    mode: "dark",
    dot: "#d1ffb0",
    repo: "https://github.com/HANCORE-linux/omarchy-shadesofjade-theme",
    colors: {
      background: "#00110b",
      foreground: "#e6f6f0",
      accent: "#d1ffb0",
      onPrimary: "#00110b",
      secondary: "#00a86b",
      surface: "#0c1d17",
      mutedText: "#59856d",
      danger: "#ff3370",
    },
  },
  {
    id: "solitude",
    label: "Solitude",
    mode: "dark",
    dot: "#798186",
    repo: "https://github.com/HANCORE-linux/omarchy-solitude-theme",
    colors: {
      background: "#101315",
      foreground: "#cacccc",
      accent: "#798186",
      onPrimary: "#101315",
      secondary: "#9fa5a9",
      surface: "#212121",
      mutedText: "#7f7f7f",
      danger: "#de6145",
    },
  },
  {
    id: "thegreek",
    label: "The Greek",
    mode: "light",
    dot: "#de6a41",
    repo: "https://github.com/HANCORE-linux/omarchy-thegreek-theme",
    colors: {
      background: "#d0d0c8",
      foreground: "#242424",
      accent: "#de6a41",
      onPrimary: "#242424",
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
    id: "velvetnight",
    label: "Velvet Night",
    mode: "dark",
    dot: "#9099a5",
    repo: "https://github.com/HANCORE-linux/omarchy-velvetnight-theme",
    colors: {
      background: "#0a101f",
      foreground: "#ffffff",
      accent: "#9099a5",
      onPrimary: "#0a101f",
      secondary: "#e2687c",
      surface: "#151b2a",
      mutedText: "#737ba7",
      danger: "#982a4b",
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
