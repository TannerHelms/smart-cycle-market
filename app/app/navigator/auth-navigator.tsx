
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { statusBarPadding } from '@utils/status-bar';
import { ForgotPassword } from '@views/forgot-password';
import { SignIn } from '@views/sign-in';
import { SignUp } from '@views/sign-up';
import * as React from 'react';

export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();


export interface AuthNavigatorProps {
}

export function AuthNavigator(props: AuthNavigatorProps) {
    return (
        <Stack.Navigator
            initialRouteName='SignIn'
            screenOptions={{
                headerShown: false,
                contentStyle: { paddingTop: statusBarPadding }
            }}>

            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
}
