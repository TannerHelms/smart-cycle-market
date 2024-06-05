export interface SignInRes {
    profile: {
        id: string,
        email: string,
        name: string,
        verified: boolean,
        avatar?: string
    },
    tokens: { refresh: string, access: string },
}
