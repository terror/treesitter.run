export type SyntaxThemeDefinition = {
  family: string;
  label: string;
  swatches: readonly [string, string, string, string];
  value: string;
};

export const syntaxThemes = [
  {
    family: 'GitHub',
    label: 'GitHub Light',
    swatches: ['#cf222e', '#0550ae', '#116329', '#8250df'],
    value: 'github-light',
  },
  {
    family: 'GitHub',
    label: 'GitHub Light Default',
    swatches: ['#cf222e', '#0969da', '#1a7f37', '#8250df'],
    value: 'github-light-default',
  },
  {
    family: 'Editor',
    label: 'VS Code Light+',
    swatches: ['#0000ff', '#795e26', '#a31515', '#267f99'],
    value: 'light-plus',
  },
  {
    family: 'Editor',
    label: 'One Light',
    swatches: ['#a626a4', '#4078f2', '#50a14f', '#c18401'],
    value: 'one-light',
  },
  {
    family: 'Soft',
    label: 'Catppuccin Latte',
    swatches: ['#8839ef', '#1e66f5', '#40a02b', '#df8e1d'],
    value: 'catppuccin-latte',
  },
  {
    family: 'Soft',
    label: 'Rose Pine Dawn',
    swatches: ['#907aa9', '#286983', '#56949f', '#d7827e'],
    value: 'rose-pine-dawn',
  },
  {
    family: 'Soft',
    label: 'Tokyo Night Day',
    swatches: ['#9854f1', '#2e7de9', '#587539', '#b15c00'],
    value: 'tokyo-night-day',
  },
  {
    family: 'High Contrast',
    label: 'Ayu Light',
    swatches: ['#fa8532', '#eba400', '#86b300', '#22a4e6'],
    value: 'ayu-light',
  },
  {
    family: 'High Contrast',
    label: 'Base16 Seti',
    swatches: ['#7d4f9e', '#287fa2', '#668c24', '#cd3f45'],
    value: 'base16-seti',
  },
  {
    family: 'High Contrast',
    label: 'Solarized Light',
    swatches: ['#859900', '#268bd2', '#2aa198', '#b58900'],
    value: 'solarized-light',
  },
  {
    family: 'Warm',
    label: 'Gruvbox Light',
    swatches: ['#9d0006', '#076678', '#79740e', '#8f3f71'],
    value: 'gruvbox-light',
  },
  {
    family: 'Warm',
    label: 'Kanagawa Lotus',
    swatches: ['#624c83', '#4d699b', '#6f894e', '#b35b79'],
    value: 'kanagawa-lotus',
  },
] as const satisfies readonly SyntaxThemeDefinition[];

export type EditorSyntaxTheme = (typeof syntaxThemes)[number]['value'];

export const defaultSyntaxTheme = 'github-light' satisfies EditorSyntaxTheme;
