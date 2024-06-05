import AsyncStorage from "@react-native-async-storage/async-storage"
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
            await AsyncStorage.setItem('access-token', res.tokens.access)
            await AsyncStorage.setItem('refresh-token', res.tokens.access)
            dispatch(updateAuthState({ profile: res.profile, pending: false }))
        } else {
            dispatch(updateAuthState({ profile: null, pending: false }))
        }
    }
    return { signIn, authState, loggedIn }
}

export default useAuth;