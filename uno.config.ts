import { defineConfig } from 'unocss'

export default defineConfig({
  // Custom shortcuts for GEOSA branding
  shortcuts: {
    'bg-main': 'bg-white text-[#1A1A1A] dark:(bg-[#08353C] text-white)',
    'bg-geosa-dark': 'bg-[#08353C]',
    'bg-geosa-teal': 'bg-[#0A3D41]',
    'text-geosa-primary': 'text-[#0070C0]',
    'text-geosa-secondary': 'text-[#00B0F0]',
    'text-geosa-accent': 'text-[#6AB380]',
    'separator': 'bg-cover bg-center bg-no-repeat',
  },
  // Theme configuration
  theme: {
    colors: {
      geosa: {
        primary: '#0070C0',
        secondary: '#00B0F0',
        cyan: '#3BF2FB',
        green: '#006C35',
        accent: '#6AB380',
        teal: '#0A3D41',
        dark: '#08353C',
      }
    }
  },
  // Safelist classes that might be used dynamically
  safelist: [
    'separator',
    'bg-cover',
    'bg-center',
    'bg-no-repeat',
  ],
})
