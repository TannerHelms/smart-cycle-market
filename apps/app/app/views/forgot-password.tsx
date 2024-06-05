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
export interface ForgotPasswordProps {
}

export function ForgotPassword(props: ForgotPasswordProps) {
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
    return (
        <Keyboard >
            <View className='items-center w-screen p-4'>
                <WelcomeHeader />
                <View className='w-full mt-3'>
                    <FormInput placeholder='email' keyboardType='email-address' autoCapitalize='none' />
                    <Button title='Request Link' />
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
