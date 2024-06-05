import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import { SignInRes } from '@utils/types';
import { newUserSchema, yupValidate } from '@utils/validator';
import client from 'api/client';
import { runAxiosAsync } from 'api/run-axios-async';
import { AuthStackParamList } from 'app/navigator/auth-navigator';
import axios from 'axios';
import { useState } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface SignUpProps {
}

export function SignUp(props: SignUpProps) {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
    const [loading, setLoading] = useState(false)

    const { name, email, password } = userInfo

    const handleChange = (name: string) => {
        return (text: string) => {
            setUserInfo({
                ...userInfo,
                [name]: text
            })
        }
    }

    const handleSubmit = async () => {
        const { values, error } = await yupValidate(newUserSchema, userInfo)
        if (error) return showMessage({ message: error, type: 'danger' })
        setLoading(true)
        const res = await runAxiosAsync<{ message: string }>(client.post('/auth/sign-up', values))
        if (res) {
            showMessage({ message: res.message, type: 'success' })
            const signInRes = await runAxiosAsync<SignInRes>(client.post('/auth/sign-in', { email, password }))
        }
        setLoading(false)
    }

    return (
        <SafeAreaView>
            <Keyboard>
                <View className='items-center w-screen p-4'>
                    <WelcomeHeader />
                    <View className='w-full mt-3'>
                        <FormInput placeholder='name' value={name} onChangeText={handleChange('name')} />
                        <FormInput placeholder='email' value={email} keyboardType='email-address' autoCapitalize='none' onChangeText={handleChange('email')} />
                        <FormInput placeholder='password' value={password} secureTextEntry={true} onChangeText={handleChange('password')} />
                        <Button title='Sign Up' onPress={handleSubmit} loading={loading} />
                        <Divider />
                        <FormNavigator
                            leftTitle='Forgot Password'
                            leftAction={() => navigate('ForgotPassword')}
                            rightTitle='Sign In'
                            rightAction={() => navigate('SignIn')}
                        />
                    </View>
                </View>
            </Keyboard>
        </SafeAreaView>
    );
}
