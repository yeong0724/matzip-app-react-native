import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import { validateSignup } from '@/utils/validation';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

const initialValue = {
  email: '',
  password: '',
  passwordConfirm: '',
};

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const { signupMutation, loginMutation } = useAuth();

  const { form, touched, errors, getInputFieldProps } = useForm({
    initialValue,
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const { email, password } = form;
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          loginMutation.mutate({ email, password });
        },
      },
    );
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
          secureTextEntry
          placeholder="비밀번호"
          touched={touched.password}
          error={errors.password}
          textContentType="oneTimeCode"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          submitBehavior="submit"
          returnKeyType="next"
          {...getInputFieldProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          touched={touched.passwordConfirm}
          error={errors.passwordConfirm}
          secureTextEntry
          textContentType="oneTimeCode"
          onSubmitEditing={handleSubmit}
          {...getInputFieldProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" onPress={handleSubmit} />
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

export default SignupScreen;
