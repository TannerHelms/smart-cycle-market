import AsyncStorage from "@react-native-async-storage/async-storage"
import { Keys, asyncStorage } from "@utils/async-storage"
import { SignInRes } from "@utils/types"
import client from "api/client"
import { runAxiosAsync } from "api/run-axios-async"
import { useDispatch, useSelector } from "react-redux"
import { getAuthState, updateAuthState } from "store/auth"
import useClient from "./use-client"
import { showMessage } from "react-native-flash-message"

const useAuth = () => {
    const dispatch = useDispatch()
    const { authClient } = useClient()
    const authState = useSelector(getAuthState)
    const loggedIn = authState.profile ? true : false

    const signIn = async (userInfo: { email: string, password: string }) => {
        dispatch(updateAuthState({ pending: true, profile: null }))
        const res = await runAxiosAsync<SignInRes>(client.post('/auth/sign-in', userInfo))
        if (res) {
            await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access)
            await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh)
            dispatch(updateAuthState({ profile: { ...res.profile, accessToken: res.tokens.access }, pending: false }))
        } else {
            dispatch(updateAuthState({ profile: null, pending: false }))
        }
    }

    const signOut = async () => {
        // await asyncStorage.clear()
        // showMessage({ message: 'Tokens Cleared', type: 'success' })
        // return;

        const token = await asyncStorage.get(Keys.REFRESH_TOKEN)
        if (token) {
            dispatch(updateAuthState({ profile: authState.profile, pending: true }))
            await runAxiosAsync(authClient.post('/auth/sign-out', { refreshToken: token }))
            await asyncStorage.remove(Keys.AUTH_TOKEN)
            await asyncStorage.remove(Keys.REFRESH_TOKEN)
            dispatch(updateAuthState({ profile: null, pending: false }))
        }

    }
    return { signIn, authState, loggedIn, signOut }
}

export default useAuth;