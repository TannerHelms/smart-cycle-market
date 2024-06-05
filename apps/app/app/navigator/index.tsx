import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { LoadingSpinner } from '@ui/loading-spinner';
import { SignedIn, SignedOut } from '@utils/auth';
import colors from '@utils/colors';
import client from 'api/client';
import { runAxiosAsync } from 'api/run-axios-async';
import useAuth from 'app/hooks/use-auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Profile, updateAuthState } from 'store/auth';
import { AppNavigator } from './app-navigator';
import { AuthNavigator } from './auth-navigator';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.background
    }
}

export function Navigator() {
    const { authState } = useAuth()
    const dispatch = useDispatch()

    const fetchAuthState = async () => {
        const token = await AsyncStorage.getItem('access-token')
        if (!token) return
        dispatch(updateAuthState({ pending: true, profile: null }))
        const res = await runAxiosAsync<{ profile: Profile }>(
            client.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        )
        if (res) {
            dispatch(updateAuthState({ pending: false, profile: res.profile }))
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
            <SignedOut>
                <AuthNavigator />
            </SignedOut>
            <SignedIn>
                <AppNavigator />
            </SignedIn>
        </NavigationContainer>
    );
}
