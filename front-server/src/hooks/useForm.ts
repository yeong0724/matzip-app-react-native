import { useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [form, setForm] = useState(initialValue);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeForm = (name: keyof T, value: string | Date | number) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // 오직 Text Input에서만 사용
  const getInputFieldProps = (name: keyof T) => {
    return {
      value: form[name] as string,
      onChangeText: (text: string) => handleChangeForm(name, text),
      onBlur: () => handleBlur(name),
    };
  };

  useEffect(() => {
    const newErrors = validate(form);
    setErrors(newErrors);
  }, [validate, form]);

  return { form, touched, errors, onChange: handleChangeForm, getInputFieldProps };
}

export default useForm;
