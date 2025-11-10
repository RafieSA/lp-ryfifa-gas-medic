import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: {
            50: "#ECF3F8",
            100: "#C4DBE8",
            200: "#A8CADD",
            300: "#80B1CD",
            400: "#67A2C3",
            500: "#418BB4",
            600: "#3B7EA4",
            700: "#2E6380",
            800: "#244C63",
            900: "#1B3A4C",
          },
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          white: "#FDFDFD",
          black: "#232323",
          dark: "#707070",
          light: "#D4D4D4",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(64deg, #418BB4 0%, #1B3A4C 100%)',
        'gradient-secondary': 'linear-gradient(64deg, #418BB4 0%, #FDFDFD 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      fontSize: {
        // Desktop
        'display': ['60px', { lineHeight: '72px', fontWeight: '700' }],
        'heading-1': ['48px', { lineHeight: '60px', fontWeight: '700' }],
        'heading-2': ['36px', { lineHeight: '48px', fontWeight: '700' }],
        'heading-3': ['28px', { lineHeight: '38px', fontWeight: '700' }],
        'body-large': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'button': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        // Mobile
        'display-mobile': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'heading-1-mobile': ['26px', { lineHeight: '34px', fontWeight: '700' }],
        'heading-2-mobile': ['22px', { lineHeight: '30px', fontWeight: '700' }],
        'heading-3-mobile': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        'body-large-mobile': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-mobile': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'button-mobile': ['16px', { lineHeight: '24px', fontWeight: '700' }],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
