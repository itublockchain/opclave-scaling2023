import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAccount(): Promise<string | null> {
  try {
    const account = await AsyncStorage.getItem('com.itu.opclave.account');
    return account;
  } catch {
    return null;
  }
}

export async function setAccount(account: string): Promise<void> {
  await AsyncStorage.setItem('com.itu.opclave.account', account);
}
