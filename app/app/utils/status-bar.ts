import { Platform, StatusBar } from "react-native"

export const statusBarPadding = Platform.OS === "android" ? StatusBar.currentHeight : 0