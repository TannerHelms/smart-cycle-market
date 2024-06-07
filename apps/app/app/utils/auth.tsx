import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "store/auth";

export function SignedIn(props: { children: ReactNode }) {
    const authState = useSelector(getAuthState)
    const loggedIn = authState.profile ? true : false
    return loggedIn ? props.children : null
}

export function SignedOut(props: { authState: AuthSTat,children: React.ReactNode }) {
    const authState = useSelector(getAuthState)
    const loggedIn = authState.profile ? true : false
    return loggedIn ? null : props.children
}