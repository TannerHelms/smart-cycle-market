import AsyncStorage from "@react-native-async-storage/async-storage"
import { Keys, asyncStorage } from "@utils/async-storage"
import { SignInRes } from "@utils/types"
import client from "app/api/client"
import { runAxiosAsync } from "app/api/run-axios-async";
import { useDispatch, useSelector } from "react-redux"
import { Profile, getAuthState, updateAuthState } from "store/auth"
import useClient from "./use-client"
import { showMessage } from "react-native-flash-message"
import { useState } from "react"

const useAuth = () => {
    const dispatch = useDispatch()
    const { authClient } = useClient()
    const authState = useSelector(getAuthState)
    const loggedIn = authState.profile ? true : false
    const [loadingProfile, setLoadingProfile] = useState(false)

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
        const token = await asyncStorage.get(Keys.REFRESH_TOKEN)
        if (token) {
            dispatch(updateAuthState({ profile: authState.profile, pending: true }))
            await runAxiosAsync(authClient.post('/auth/sign-out', { refreshToken: token }))
            await asyncStorage.remove(Keys.AUTH_TOKEN)
            await asyncStorage.remove(Keys.REFRESH_TOKEN)
            dispatch(updateAuthState({ profile: null, pending: false }))
        }

    }

    const updateUser = async (profile: Profile) => {
        const res = await runAxiosAsync<{ profile: Profile }>(authClient.patch(`/auth/update-profile`, profile))
        if (res?.profile) {
            dispatch(updateAuthState({ profile: res.profile, pending: false }))
            showMessage({ message: 'Profiled updated successfully', type: 'success' })
        }
    }

    const getProfile = async () => {
        setLoadingProfile(true)
        const res = await runAxiosAsync<{ profile: Profile }>(authClient.get('/auth/profile'))
        if (res?.profile) {
            dispatch(updateAuthState({ profile: res.profile, pending: false }))
        }
        setLoadingProfile(false)
    }

    const verifyToken = async () => {
        const res = await runAxiosAsync<{ message: string }>(authClient.get('/auth/verify-token'))
        if (res?.message) {
            showMessage({ message: res.message, type: 'success' })
        }
    }
    return { signIn, authState, loggedIn, signOut, updateUser, verifyToken, getProfile, loadingProfile }
}

export default useAuth;