import { Keys, asyncStorage } from "@utils/async-storage";
import { baseUrl } from "app/api/client";
import { runAxiosAsync } from "app/api/run-axios-async";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, updateAuthState } from "store/auth";

type Response = {
    tokens: {
        access: string
        refresh: string
    }
}

const authClient = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})

const useClient = () => {
    const dispatch = useDispatch()
    const authState = useSelector(getAuthState)
    const token = authState.profile?.accessToken
    authClient.interceptors.request.use((config) => {
        if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, (error) => {
        Promise.reject(error)
    })

    const refreshAuthLogic = async (failedRequest: any) => {
        const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN)
        const options = { method: 'POST', data: { refreshToken }, url: `${baseUrl}/auth/refresh-token` }
        const res = await runAxiosAsync<Response>(axios(options))
        if (res?.tokens) {
            failedRequest.response.config.headers.Authorization = `Bearer ${res.tokens.access}`
            if (failedRequest.response.config.url === '/auth/sign-out') {
                failedRequest.response.config.data = { refreshToken: res.tokens.refresh }
            }
            await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access)
            await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh)
            dispatch(updateAuthState({ profile: { ...authState.profile!, accessToken: res.tokens.access }, pending: false }))
            return Promise.resolve()
        }
    }

    createAuthRefreshInterceptor(authClient, refreshAuthLogic)


    return { authClient }
}

export default useClient;