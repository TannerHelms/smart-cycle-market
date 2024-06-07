import { ComponentProps, ReactNode } from "react"
import { View, ViewProps } from "react-native"

export function Row(props: ViewProps) {
    return (
        <View className='flex flex-row items-center' {...props}>
            {props.children}
        </View>
    )

}
export function Col(props: ViewProps) {
    return (
        <View {...props}>
            {props.children}
        </View>
    )
}