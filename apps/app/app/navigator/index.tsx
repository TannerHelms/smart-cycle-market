import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { LoadingSpinner } from '@ui/loading-spinner';
import { SignedIn, SignedOut } from '@utils/auth';
import colors from '@utils/colors';
import client from 'app/api/client';
import { runAxiosAsync } from 'app/api/run-axios-async';
import useAuth from 'app/hooks/use-auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Profile, updateAuthState } from 'store/auth';
import { AuthNavigator } from './auth-navigator';
import TabNavigator from './tab-navigator';
import useClient from 'app/hooks/use-client';
import { Keys, asyncStorage } from '@utils/async-storage';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.background
    }
}

export function Navigator() {
    const { authState } = useAuth()
    const { authClient } = useClient()
    const dispatch = useDispatch()

    const fetchAuthState = async () => {
        const token = await asyncStorage.get(Keys.AUTH_TOKEN)
        if (!token) return
        dispatch(updateAuthState({ pending: true, profile: null }))
        const res = await runAxiosAsync<{ profile: Profile }>(
            authClient.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        )
        if (res) {
            dispatch(updateAuthState({ pending: false, profile: { ...res.profile, accessToken: token } }))
        } else {
            dispatch(updateAuthState({ pending: false, profile: null }))
        }
    }

    useEffect(() => {
        fetchAuthState()
    }, [])


    return (
        <NavigationContainer
            theme={MyTheme}>
            <LoadingSpinner visible={authState.pending} />
            {!authState.profile && (
                <AuthNavigator />
            )}
            {authState.profile && (
                <TabNavigator />
            )}
        </NavigationContainer>
    );
}
