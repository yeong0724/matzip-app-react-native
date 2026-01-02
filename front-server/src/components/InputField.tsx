import { colors } from '@/constants/colors';
import { Ref } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  error?: string;
  touched?: boolean;
}

function InputField({ error, touched, ...props }: InputFieldProps) {
  return (
    <View>
      <TextInput
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize="none"
        style={[styles.input, Boolean(error) && touched && styles.inputError]}
        {...props}
      />
      {Boolean(error) && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  errorText: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
