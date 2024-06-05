import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import { AuthStackParamList } from 'app/navigator/auth-navigator';
import * as React from 'react';
import { Platform, ScrollView, View } from 'react-native';

export interface SignInProps {
}

export function SignIn(props: SignInProps) {
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
    return (
        <Keyboard>
            <View className='items-center w-screen p-4'>
                <WelcomeHeader />
                <View className='w-full mt-3'>
                    <FormInput placeholder='email' keyboardType='email-address' autoCapitalize='none' />
                    <FormInput placeholder='password' secureTextEntry={true} />
                    <Button title='Sign In' />
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
    );
}
