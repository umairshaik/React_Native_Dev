export declare type Mode = 'light' | 'dark';
export declare type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};
export declare type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

export declare enum TypescaleKey {
  displayLarge = 'displayLarge',
  displayMedium = 'displayMedium',
  displaySmall = 'displaySmall',
  headlineLarge = 'headlineLarge',
  headlineMedium = 'headlineMedium',
  headlineSmall = 'headlineSmall',
  titleLarge = 'titleLarge',
  titleMedium = 'titleMedium',
  titleSmall = 'titleSmall',
  labelLarge = 'labelLarge',
  labelMedium = 'labelMedium',
  labelSmall = 'labelSmall',
  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
}
export declare type Type = {
  fontFamily: string;
  letterSpacing: number;
  fontWeight: Font['fontWeight'];
  lineHeight: number;
  fontSize: number;
};

export declare type Typescale = {
  [key in TypescaleKey]: Type;
};
export declare type MD3Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export declare enum ElevationLevels {
  'level0' = 0,
  'level1' = 1,
  'level2' = 2,
  'level3' = 3,
  'level4' = 4,
  'level5' = 5,
}
export declare type ElevationColors = {
  [key in keyof typeof ElevationLevels]: string;
};

export declare type Colors = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  outline: string;
  elevation: ElevationColors;
  // surface: string;
  // surfaceVariant: string;
  // surfaceDisabled: string;
  // onSurface: string;
  // onSurfaceVariant: string;
  // onSurfaceDisabled: string;
  // inverseSurface: string;
  // inverseOnSurface: string;
  // inversePrimary: string;
  // backdrop: string;
};
export declare type Theme = {
  colors: Colors;
  fonts: Typescale;
};
