import { ActivityIndicator, Pressable, PressableProps, Text, TextProps } from "react-native";

interface ButtonProps extends PressableProps {
    title: string;
    loading?: boolean;
}

export default function Button(props: ButtonProps) {
    return (
        <Pressable className='cursor-pointer p-3 rounded-md items-center bg-primary active:opacity-80' {...props} disabled={props.loading || false}>
            {props.loading && <ActivityIndicator color='white' />}
            {!props.loading && <Text className='text-white tracking-wide font-semibold'>{props.title}</Text>}
        </Pressable>
    )
}