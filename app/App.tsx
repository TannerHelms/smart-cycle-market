import { DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@utils/colors';
import { Navigator } from 'app/navigator';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}

