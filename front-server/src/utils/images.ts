import { Image } from 'react-native-image-crop-picker';

function getFormDataImages(key: string = 'images', images: Image[]) {
  const formData = new FormData();
  images.forEach(({ path, mime }) => {
    const file = {
      uri: path,
      name: path.split('/').pop(),
      type: mime,
    };

    formData.append(key, file);
  });

  return formData;
}

export { getFormDataImages };
