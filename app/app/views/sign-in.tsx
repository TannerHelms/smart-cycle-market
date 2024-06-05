import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import { SignInRes } from '@utils/types';
import { signInSchema, yupValidate } from '@utils/validator';
import client from 'api/client';
import { runAxiosAsync } from 'api/run-axios-async';
import { AuthStackParamList } from 'app/navigator/auth-navigator';
import axios from 'axios';
import { useState } from 'react';

import { Platform, ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface SignInProps {
}

export function SignIn(props: SignInProps) {
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        const res = await runAxiosAsync<SignInRes>(client.post('/auth/sign-in', values))
        setLoading(false)
    }

    const { email, password } = userInfo

    return (
        <SafeAreaView>
            <Keyboard>
                <View className='items-center w-screen p-4'>
                    <WelcomeHeader />
                    <View className='w-full mt-3'>
                        <FormInput placeholder='email' value={email} keyboardType='email-address' autoCapitalize='none' onChangeText={handleChange('email')} />
                        <FormInput placeholder='password' value={password} secureTextEntry={true} onChangeText={handleChange('password')} />
                        <Button title='Sign In' loading={loading} onPress={handleSubmit} />
                        <Divider />
                        <FormNavigator
                            leftTitle='Forgot Password'
                            leftAction={() => navigate('ForgotPassword')}
                            rightTitle='Sign Up'
                            rightAction={() => navigate('SignUp')}
                        />
                    </View>
                </View>
            </Keyboard>
        </SafeAreaView>
    );
}
