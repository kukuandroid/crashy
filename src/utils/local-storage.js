import AsyncStorage from '@react-native-async-storage/async-storage';
export const key = '@error_logs';

const setItem = async (key, value) => await AsyncStorage.setItem(key, value);

const getItem = async (key) => await AsyncStorage.getItem(key);

const clear = async () => await AsyncStorage.removeItem(key);

export {
  setItem,
  getItem,
  clear
};