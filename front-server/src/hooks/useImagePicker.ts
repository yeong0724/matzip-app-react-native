import { getFormDataImages } from '@/utils/images';
import ImageCropPicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import { useState } from 'react';
import { ImageUri } from '@/types/domain';
import Toast from 'react-native-toast-message';

function useImagePicker() {
  const { mutate: uploadImagesMutate } = useMutateImages();
  const [imageUriList, setImageUriList] = useState<ImageUri[]>([]);

  const addImageUri = (uris: string[]) => {
    setImageUriList(prev => [...prev, ...uris.map(uri => ({ uri }))]);
  };

  const deleteImageUri = (uri: string) => {
    setImageUriList(prev => prev.filter(image => image.uri !== uri));
  };

  const handleChangeImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);
        uploadImagesMutate(formData, {
          onSuccess: data => {
            addImageUri(data);
          },
        });
      })
      .catch(error => {
        console.log(error.code);
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {
    imageUriList,
    deleteImageUri,
    handleChangeImage,
  };
}

export default useImagePicker;
