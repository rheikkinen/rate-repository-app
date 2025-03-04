import { Pressable, StyleSheet, Text } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    height: 64,
  },
  text: {
    fontSize: 18,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
  textPrimary: {
    color: 'white',
  },
  pressed: {
    backgroundColor: theme.colors.background.pressed,
  },
});

const Button = ({ variant = 'primary', size, style, ...props }) => {
  const buttonStyle = [styles.button, size === 'large' && styles.large, style];
  const textStyle = [styles.text, variant === 'primary' && styles.textPrimary];

  return (
    <Pressable
      style={({ pressed }) => [buttonStyle, pressed && styles.pressed]}
      {...props}
    >
      <Text style={textStyle}>{props.children}</Text>
    </Pressable>
  );
};

export default Button;
