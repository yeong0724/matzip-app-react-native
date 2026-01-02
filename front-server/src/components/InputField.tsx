import { colors } from '@/constants/colors';
import { Ref } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

function InputField({
  ref,
  error,
  touched,
  disabled = false,
  multiline = false,
  ...props
}: InputFieldProps) {
  return (
    <View>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.GRAY_500}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize="none"
        multiline={multiline}
        editable={!disabled}
        style={[
          styles.input,
          multiline && styles.multiline,
          Boolean(error) && touched && styles.inputError,
          disabled && styles.disabled,
        ]}
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
  multiline: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_500,
  },
});

export default InputField;
