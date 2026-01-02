interface LoginValidationProps {
  email: string;
  password: string;
}

function validateEmailAndPassword(values: LoginValidationProps) {
  const { email, password } = values;

  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  if (password.length < 8 || password.length > 20) {
    errors.password = '비밀번호는 8자 이상 20자 이하여야 합니다.';
  }

  return errors;
}

function validateSignup(values: { email: string; password: string; passwordConfirm: string }) {
  const { password, passwordConfirm } = values;
  const errors = {
    ...validateEmailAndPassword(values),
    passwordConfirm: '',
  };

  if (password !== passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

export { validateEmailAndPassword, validateSignup };
