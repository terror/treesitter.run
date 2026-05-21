export type ColorMode = 'dark' | 'light';

export type SyntaxThemeDefinition = {
  family: string;
  label: string;
  swatches: Record<ColorMode, readonly [string, string, string, string]>;
  value: string;
};

export const syntaxThemes = [
  {
    family: 'GitHub',
    label: 'GitHub',
    swatches: {
      light: ['#cf222e', '#0550ae', '#116329', '#8250df'],
      dark: ['#ff7b72', '#79c0ff', '#7ee787', '#d2a8ff'],
    },
    value: 'github',
  },
  {
    family: 'GitHub',
    label: 'GitHub Default',
    swatches: {
      light: ['#cf222e', '#0969da', '#1a7f37', '#8250df'],
      dark: ['#ff7b72', '#58a6ff', '#7ee787', '#d2a8ff'],
    },
    value: 'github-default',
  },
  {
    family: 'Editor',
    label: 'VS Code+',
    swatches: {
      light: ['#0000ff', '#795e26', '#a31515', '#267f99'],
      dark: ['#569cd6', '#dcdcaa', '#ce9178', '#4ec9b0'],
    },
    value: 'vscode',
  },
  {
    family: 'Editor',
    label: 'One',
    swatches: {
      light: ['#a626a4', '#4078f2', '#50a14f', '#c18401'],
      dark: ['#c678dd', '#61afef', '#98c379', '#d19a66'],
    },
    value: 'one',
  },
  {
    family: 'Soft',
    label: 'Catppuccin',
    swatches: {
      light: ['#8839ef', '#1e66f5', '#40a02b', '#df8e1d'],
      dark: ['#cba6f7', '#89b4fa', '#a6e3a1', '#fab387'],
    },
    value: 'catppuccin',
  },
  {
    family: 'Soft',
    label: 'Rose Pine',
    swatches: {
      light: ['#907aa9', '#286983', '#56949f', '#d7827e'],
      dark: ['#c4a7e7', '#9ccfd8', '#ebbcba', '#f6c177'],
    },
    value: 'rose-pine',
  },
  {
    family: 'Soft',
    label: 'Tokyo Night',
    swatches: {
      light: ['#9854f1', '#2e7de9', '#587539', '#b15c00'],
      dark: ['#bb9af7', '#7aa2f7', '#9ece6a', '#ff9e64'],
    },
    value: 'tokyo-night',
  },
  {
    family: 'High Contrast',
    label: 'Ayu',
    swatches: {
      light: ['#fa8532', '#eba400', '#86b300', '#22a4e6'],
      dark: ['#ff8f40', '#ffd173', '#aad94c', '#59c2ff'],
    },
    value: 'ayu',
  },
  {
    family: 'High Contrast',
    label: 'Solarized',
    swatches: {
      light: ['#859900', '#268bd2', '#2aa198', '#b58900'],
      dark: ['#859900', '#268bd2', '#2aa198', '#b58900'],
    },
    value: 'solarized',
  },
  {
    family: 'Warm',
    label: 'Gruvbox',
    swatches: {
      light: ['#9d0006', '#076678', '#79740e', '#8f3f71'],
      dark: ['#fb4934', '#83a598', '#b8bb26', '#d3869b'],
    },
    value: 'gruvbox',
  },
  {
    family: 'Warm',
    label: 'Kanagawa',
    swatches: {
      light: ['#624c83', '#4d699b', '#6f894e', '#b35b79'],
      dark: ['#957fb8', '#7e9cd8', '#98bb6c', '#ffa066'],
    },
    value: 'kanagawa',
  },
] as const satisfies readonly SyntaxThemeDefinition[];

export type EditorSyntaxTheme = (typeof syntaxThemes)[number]['value'];

export const defaultSyntaxTheme = 'github' satisfies EditorSyntaxTheme;
