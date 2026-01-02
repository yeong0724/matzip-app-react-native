import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import { MapStackParamList } from '@/types/navigation';
import { validateAddLocation } from '@/utils/validation';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({ route }: Props) {
  const { location } = route.params;
  const address = useGetAddress(location);

  const { touched, errors, getInputFieldProps } = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddLocation,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField value={address} disabled />
      <CustomButton variant="outlined" label="날짜 선택" />
      <InputField
        placeholder="제목을 입력하세요."
        error={errors.title}
        touched={touched.title}
        {...getInputFieldProps('title')}
      />
      <InputField
        multiline
        placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
        error={errors.description}
        touched={touched.description}
        {...getInputFieldProps('description')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});

export default AddLocationScreen;
