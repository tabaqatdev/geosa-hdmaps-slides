import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    themeVariables: {
      // Font - Cairo for Arabic support
      fontFamily: 'Cairo, sans-serif',
      fontSize: '16px',

      // GEOSA Primary Colors
      primaryColor: '#0070C0',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#005a9e',

      // GEOSA Secondary Colors
      secondaryColor: '#00B0F0',
      secondaryTextColor: '#ffffff',
      secondaryBorderColor: '#0090d0',

      // GEOSA Tertiary/Background
      tertiaryColor: '#e8f4fc',
      tertiaryTextColor: '#1a1a1a',
      tertiaryBorderColor: '#0070C0',

      // Node styling
      nodeBorder: '#0070C0',
      nodeTextColor: '#ffffff',
      mainBkg: '#0070C0',

      // Subgraph/Cluster styling - GEOSA teal theme
      clusterBkg: '#f0f8ff',
      clusterBorder: '#0A3D41',
      titleColor: '#0A3D41',

      // Line/Edge colors
      lineColor: '#0A3D41',
      edgeLabelBackground: '#ffffff',

      // Text colors
      textColor: '#1a1a1a',
    },
  }
})
