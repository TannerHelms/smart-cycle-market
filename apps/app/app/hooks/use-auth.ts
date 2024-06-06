import AsyncStorage from "@react-native-async-storage/async-storage"
import { Keys, asyncStorage } from "@utils/async-storage"
import { SignInRes } from "@utils/types"
import client from "api/client"
import { runAxiosAsync } from "api/run-axios-async"
import { useDispatch, useSelector } from "react-redux"
import { getAuthState, updateAuthState } from "store/auth"

const useAuth = () => {
    const dispatch = useDispatch()
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
    return { signIn, authState, loggedIn }
}

export default useAuth;