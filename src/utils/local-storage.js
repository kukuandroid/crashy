import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => await AsyncStorage.setItem(key, value);

const getItem = async (key) => await AsyncStorage.getItem(key);

export {
  setItem,
  getItem
};