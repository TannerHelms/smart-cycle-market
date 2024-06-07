import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { SafeAreaView } from '@ui/safe-area-view';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import { signInSchema, yupValidate } from '@utils/validator';
import useAuth from 'app/hooks/use-auth';
import { AuthStackParamList } from 'app/navigator/auth-navigator';
import { useState } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export interface SignInProps {
}

export function SignIn(props: SignInProps) {
    const { signIn } = useAuth()
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (name: string) => {
        return (text: string) => {
            setUserInfo({
                ...userInfo,
                [name]: text
            })
        }
    }

    const handleSubmit = async () => {
        const { values, error } = await yupValidate(signInSchema, userInfo)
        if (error) return showMessage({ message: error, type: 'danger' })
        if (values) signIn(values)
    }

    const { email, password } = userInfo

    return (
        <Keyboard>
            <SafeAreaView>
                <View className='items-center'>
                    <WelcomeHeader />
                    <View className='w-full mt-3'>
                        <FormInput placeholder='email' value={email} keyboardType='email-address' autoCapitalize='none' onChangeText={handleChange('email')} />
                        <FormInput placeholder='password' value={password} secureTextEntry={true} onChangeText={handleChange('password')} />
                        <Button title='Sign In' onPress={handleSubmit} />
                        <Divider />
                        <FormNavigator
                            leftTitle='Forgot Password'
                            leftAction={() => navigate('ForgotPassword')}
                            rightTitle='Sign Up'
                            rightAction={() => navigate('SignUp')}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Keyboard>
    );
}
