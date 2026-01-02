import CustomButton from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { AuthStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Navigation = StackNavigationProp<AuthStackParamList>;

function AuthHomeScreen() {
  const navigation = useNavigation<Navigation>();

  const moveToLoginScreenByEmail = () => {
    navigation.navigate('Login');
  };

  const moveToSignUpScreen = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@/assets/MATZIP.png')} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="이메일 로그인" onPress={moveToLoginScreenByEmail} />
        <Pressable
          onPress={moveToSignUpScreen}
          style={({ pressed }) => [pressed && styles.emailTextPressed]}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1.5,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    flex: 1,
    gap: 5,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: '100%',
  },
  emailTextPressed: {
    opacity: 0.5,
  },
  emailText: {
    textDecorationLine: 'underline',
    fontWeight: 500,
    padding: 10,
    color: colors.BLACK,
  },
});

export default AuthHomeScreen;
