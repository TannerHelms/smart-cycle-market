import { Platform, StatusBar } from "react-native"

export const statusBarPadding = Platform.OS === "android" ? `p-[${StatusBar.currentHeight!}px]` : ""