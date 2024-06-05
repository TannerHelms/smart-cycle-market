import { ReactNode } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native';
import colors from './colors';

export function H1(props: { children: ReactNode }) {
    return (
        <Text className='font-bold text-lg text-center tracking-wide mb-3'>
            {props.children}
        </Text>
    );
}
export function H2(props: { children: ReactNode }) {
    return (
        <Text className='text-md text-center leading-5'>
            {props.children}
        </Text>
    );
}

interface FormInputProps extends TextInputProps {

}

export function FormInput(props: FormInputProps) {
    return (
        <TextInput
            className={`w-full p-3 rounded-md mb-4 border border-deActive focus:border-primary`}
            {...props}
        />
    )
} 
