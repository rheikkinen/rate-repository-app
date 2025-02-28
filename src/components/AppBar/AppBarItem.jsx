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
    backgroundColor: theme.colors.pressed,
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
        {
          backgroundColor:
            currentPath === path ? theme.colors.secondary : 'transparent',
        },
        styles.item,
        pressed && styles.pressed,
      ]}
    >
      <Text style={textStyle} fontSize={'heading'}>
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarItem;
