import Ionicons from '@react-native-vector-icons/ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { MainDrawerParamList } from '@/types/navigation';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

function DrawerButton({ color = colors.BLACK }) {
  const navigation = useNavigation<Navigation>();

  const handlePress = () => {
    navigation.openDrawer();
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
