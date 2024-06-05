import { statusBarPadding } from '@utils/status-bar';
import { SignUp } from '@views/sign-up';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className='items-center' style={{ paddingTop: statusBarPadding }}>
      <SignUp />
    </SafeAreaView>
  );
}

