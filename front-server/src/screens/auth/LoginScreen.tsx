import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import { validateEmailAndPassword } from '@/utils/validation';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

const initialValue = {
  email: '',
  password: '',
};

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const { loginMutation } = useAuth();
  const { form, touched, errors, getInputFieldProps } = useForm({
    initialValue,
    validate: validateEmailAndPassword,
  });

  const handleSubmit = () => {
    const { email, password } = form;
    loginMutation.mutate({ email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          touched={touched.email}
          error={errors.email}
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType="next"
          inputMode="email"
          {...getInputFieldProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          touched={touched.password}
          error={errors.password}
          secureTextEntry
          textContentType="oneTimeCode"
          maxLength={20}
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...getInputFieldProps('password')}
        />
      </View>
      <CustomButton label="로그인" variant="filled" size="large" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
