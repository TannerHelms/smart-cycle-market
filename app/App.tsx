import { statusBarPadding } from '@utils/status-bar';
import { SignIn } from '@views/sign-in';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className={`items-center ${statusBarPadding}`}>
      <SignIn />
    </SafeAreaView>
  );
}

