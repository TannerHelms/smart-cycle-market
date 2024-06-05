import Button from '@ui/button';
import { Divider } from '@ui/divider';
import { FormNavigator } from '@ui/form-navigator';
import { Keyboard } from '@ui/keyboard';
import { WelcomeHeader } from '@ui/welcome-header';
import { FormInput } from '@utils/text';
import * as React from 'react';
import { Platform, ScrollView, View } from 'react-native';
export interface ForgotPasswordProps {
}

export function ForgotPassword(props: ForgotPasswordProps) {
    return (
        <Keyboard >
            <View className='items-center w-screen p-4'>
                <WelcomeHeader />
                <View className='w-full mt-3'>
                    <FormInput placeholder='email' keyboardType='email-address' autoCapitalize='none' />
                    <Button title='Request Link' />
                    <Divider />
                    <FormNavigator
                        leftTitle='Sign UP'
                        leftAction={() => { }}
                        rightTitle='Sign In'
                        rightAction={() => { }}
                    />
                </View>
            </View>
        </Keyboard>
    );
}
