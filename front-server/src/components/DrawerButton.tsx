import Ionicons from '@react-native-vector-icons/ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { MainDrawerParamList } from '@/types/navigation';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
}

function DrawerButton({ style, color = colors.BLACK }: DrawerButtonProps) {
  const navigation = useNavigation<Navigation>();

  const handlePress = () => {
    navigation.openDrawer();
  };

  return (
    <Pressable style={[styles.container, style]} onPress={handlePress}>
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
