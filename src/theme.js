import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textError: 'red',
    primary: '#0366d6',
    secondary: '#aad2ff',
    pressed: '#7cb0ff',
    background: {
      primary: '#ededed',
    },
  },
  fontSizes: {
    body: 14,
    heading: 24,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
