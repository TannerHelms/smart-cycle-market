import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import * as React from 'react';
import { View } from 'react-native';

export interface SignInProps {
}

export function SignIn(props: SignInProps) {
    return (
        <View className='items-center w-full'>
            <WelcomeHeader />
            <View className='w-full mt-3'>
                <FormInput placeholder='email' keyboardType='email-address' autoCapitalize='none' />
                <FormInput placeholder='password' secureTextEntry={true} />
                <Button title='Sign In' />
                <Divider />
            </View>
        </View>
    );
}
