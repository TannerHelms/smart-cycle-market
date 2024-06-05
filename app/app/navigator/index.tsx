import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import colors from '@utils/colors';
import { AuthNavigator } from './auth-navigator';

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
            <AuthNavigator />
        </NavigationContainer>
    );
}
