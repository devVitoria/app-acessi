import AsyncStorage from "@react-native-async-storage/async-storage";

 const storage = {
  async set(key: string, value: unknown) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};


export default storage;