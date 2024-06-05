import { Navigator } from 'app/navigator';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </Provider>
  );
}

