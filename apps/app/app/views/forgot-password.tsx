import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import { emailRegex } from '@utils/validator';
import client from 'app/api/client';
import { runAxiosAsync } from 'app/api/run-axios-async';
import { AuthStackParamList } from 'app/navigator/auth-navigator';
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
export interface ForgotPasswordProps {
}

export function ForgotPassword(props: ForgotPasswordProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()

    const handleSubmit = async () => {
        if (!emailRegex.test(email)) {
            return showMessage({
                message: 'Invalid Email',
                type: 'danger'
            })
        }
        setLoading(true)
        const res = await runAxiosAsync<{ message: string }>(client.post("/auth/forgot-password", { email }))
        setLoading(false)
        if (res) {
            showMessage({
                message: res.message,
                type: 'success'
            })
        }
    }

    return (
        <Keyboard >
            <View className='items-center w-screen p-4'>
                <WelcomeHeader />
                <View className='w-full mt-3'>
                    <FormInput
                        placeholder='email'
                        value={email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={text => setEmail(text)}
                    />
                    <Button title='Request Link' onPress={handleSubmit} loading={loading} />
                    <Divider />
                    <FormNavigator
                        leftTitle='Sign Up'
                        leftAction={() => navigate('SignUp')}
                        rightTitle='Sign In'
                        rightAction={() => navigate('SignIn')}
                    />
                </View>
            </View>
        </Keyboard>
    );
}
