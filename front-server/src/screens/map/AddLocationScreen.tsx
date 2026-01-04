import CustomButton from '@/components/CustomButton';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import ImageInput from '@/components/ImageInput';
import InputField from '@/components/InputField';
import MarkerColorInput from '@/components/MarkerColorInput';
import PreviewImageList from '@/components/PreviewImageList';
import ScoreInput from '@/components/ScoreInput';
import { colors } from '@/constants/colors';
import useMutateLocation from '@/hooks/queries/useMutateLocation';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import { MapStackParamList } from '@/types/navigation';
import { getDateWithSeparator } from '@/utils/date';
import { validateAddLocation } from '@/utils/validation';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

type FormType = {
  title: string;
  description: string;
  date: Date;
  color: string;
  score: number;
};

function AddLocationScreen({ route }: Props) {
  usePermission('PHOTO');
  const navigation = useNavigation();
  const { location } = route.params;
  const address = useGetAddress(location);
  const { form, touched, errors, onChange, getInputFieldProps } = useForm<FormType>({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddLocation,
  });
  const inset = useSafeAreaInsets();
  const { handleChangeImage, imageUriList, deleteImageUri } = useImagePicker();
  const { mutate: createLocationMutate } = useMutateLocation();
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleSubmit = () => {
    createLocationMutate(
      {
        ...location,
        ...form,
        imageUris: imageUriList,
        address,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: inset.bottom + 100 }]}>
        <InputField value={address} disabled />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparator(form.date, '. ')}
          onPress={() => setOpenDatePicker(true)}
        />
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
        <MarkerColorInput
          color={form.color}
          onChangeColor={color => onChange('color', color)}
          score={form.score}
        />
        <ScoreInput score={form.score} onChangeScore={score => onChange('score', score)} />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={form.date}
          open={openDatePicker}
          onConfirm={date => {
            onChange('date', date);
            setOpenDatePicker(false);
          }}
          onCancel={() => setOpenDatePicker(false)}
        />
        <View style={{ flexDirection: 'row' }}>
          <ImageInput onChange={handleChangeImage} />
          <PreviewImageList imageUriList={imageUriList} onDelete={deleteImageUri} />
        </View>
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});

export default AddLocationScreen;
