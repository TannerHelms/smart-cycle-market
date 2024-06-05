import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export interface SignUpProps {
}

export function SignUp(props: SignUpProps) {
    return (
        <Keyboard>
            <View className='items-center w-screen p-4'>
                <WelcomeHeader />
                <View className='w-full mt-3'>
                    <FormInput placeholder='name' />
                    <FormInput placeholder='email' keyboardType='email-address' autoCapitalize='none' />
                    <FormInput placeholder='password' secureTextEntry={true} />
                    <Button title='Sign Up' />
                    <Divider />
                    <FormNavigator
                        leftTitle='Forgot Password'
                        leftAction={() => { }}
                        rightTitle='Sign In'
                        rightAction={() => { }}
                    />
                </View>
            </View>
        </Keyboard>
    );
}
