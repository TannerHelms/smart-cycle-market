
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { statusBarPadding } from '@utils/status-bar';
import { Home } from '@views/home';
import { Profile } from '@views/profile';
import * as React from 'react';

export type ProfileStackParamList = {
    Profile: undefined;
}

const Stack = createNativeStackNavigator<ProfileStackParamList>();


export interface ProfileNavigatorProps {
}

export function ProfileNavigator(props: ProfileNavigatorProps) {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
                contentStyle: { paddingTop: statusBarPadding }
            }}>
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}
