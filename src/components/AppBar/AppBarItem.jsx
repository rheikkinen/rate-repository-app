import { Pressable, StyleSheet } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 12,
  },
  pressed: {
    backgroundColor: theme.colors.background.pressed,
  },
  active: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 3,
  },
});

const AppBarItem = ({ children, onPress, path, textStyle }) => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handlePress = async () => {
    if (typeof onPress === 'function') {
      await onPress();
    }

    if (path) navigateTo(path);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.item,
        currentPath === path && styles.active,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={textStyle}
        color={currentPath === path ? 'primary' : 'textPrimary'}
        fontSize={'heading'}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarItem;
