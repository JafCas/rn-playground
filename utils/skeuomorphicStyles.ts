import { TextStyle, ViewStyle } from "react-native";

// Skeuomorphic Design System
const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  pressed: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
};

const borders = {
  raised: {
    borderWidth: 1,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f5f5f5",
    borderRightColor: "#e0e0e0",
    borderBottomColor: "#ddd",
  },
  inset: {
    borderWidth: 1,
    borderTopColor: "#e9ecef",
    borderLeftColor: "#e9ecef",
    borderRightColor: "#ffffff",
    borderBottomColor: "#ffffff",
  },
  subtle: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderTopColor: "#f5f5f5",
    borderLeftColor: "#f0f0f0",
  }
};

const textShadows = {
  embossed: {
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  engraved: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  subtle: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
};

export const SkeuomorphicStyles = {
  // Color Palette (matching Task components)
  colors: {
    primary: "#2c3e50",
    secondary: "#7f8c8d",
    accent: "#007AFF",
    success: "#27ae60",
    warning: "#f39c12",
    danger: "#e74c3c",
    background: "#ffffff",
    surface: "#f8f9fa",
    border: "#e8e8e8",
    shadow: "#000000",
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
      light: "#95a5a6",
      white: "#ffffff",
    },
    light: {
      primary: "#f8f8f8",
      secondary: "#f5f5f5",
      tertiary: "#e9ecef",
    },
    dark: {
      primary: "#e0e0e0",
      secondary: "#ddd",
      tertiary: "#cb4335",
    }
  },

  // Shadow Presets
  shadows,
  
  // Border System (simulating light source from top-left)
  borders,

  // Text Shadows
  textShadows,

  // Component Presets
  presets: {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 16,
      ...shadows.large,
      ...borders.raised,
    } as ViewStyle,

    header: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 16,
      marginVertical: 8,
      ...shadows.medium,
      ...borders.raised,
    } as ViewStyle,

    surface: {
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      padding: 12,
      ...borders.inset,
    } as ViewStyle,

    titleText: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: "#2c3e50",
      ...textShadows.subtle,
    } as TextStyle,

    subtitleText: {
      fontSize: 16,
      fontWeight: "500" as const,
      color: "#7f8c8d",
      ...textShadows.embossed,
    } as TextStyle,

    labelText: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: "#2c3e50",
      ...textShadows.embossed,
    } as TextStyle,
  }
};

// Utility functions for dynamic styling
export const createSkeuomorphicStyle = {
  // Create a raised surface (button-like)
  raised: (backgroundColor: string = "#ffffff", borderRadius: number = 8): ViewStyle => ({
    backgroundColor,
    borderRadius,
    ...shadows.medium,
    ...borders.raised,
  }),

  // Create an inset surface (input-like)
  inset: (backgroundColor: string = "#f8f9fa", borderRadius: number = 8): ViewStyle => ({
    backgroundColor,
    borderRadius,
    ...borders.inset,
  }),

  // Create colored shadow
  coloredShadow: (color: string, intensity: 'small' | 'medium' | 'large' = 'medium'): ViewStyle => ({
    ...shadows[intensity],
    shadowColor: color,
  }),

  // Create text with depth
  textWithDepth: (color: string = "#2c3e50", size: number = 16): TextStyle => ({
    color,
    fontSize: size,
    fontWeight: "600",
    ...textShadows.subtle,
  }),
};

export default SkeuomorphicStyles;
