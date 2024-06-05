import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@utils/colors';
import { AuthNavigator } from './auth-navigator';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.background
    }
}

export function Navigator() {
    return (
        <NavigationContainer
            theme={MyTheme}>
            <FlashMessage position='bottom' />
            <AuthNavigator />
        </NavigationContainer>
    );
}
