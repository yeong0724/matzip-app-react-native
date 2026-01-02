import EncryptedStorage from 'react-native-encrypted-storage';

async function setEncryptStorage<T>(key: string, value: T) {
  await EncryptedStorage.setItem(key, JSON.stringify(value));
}

async function getEncryptStorage(key: string) {
  const storedData = await EncryptedStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
}

async function removeEncryptStorage(key: string) {
  const storedData = await getEncryptStorage(key);

  if (storedData) {
    await EncryptedStorage.removeItem(key);
  }
}

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
