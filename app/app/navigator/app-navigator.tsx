
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { statusBarPadding } from '@utils/status-bar';
import { Home } from '@views/home';
import * as React from 'react';

export type AppStackParamList = {
    Home: undefined;
}

const Stack = createNativeStackNavigator<AppStackParamList>();


export interface AppNavigatorProps {
}

export function AppNavigator(props: AppNavigatorProps) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                contentStyle: { paddingTop: statusBarPadding }
            }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
