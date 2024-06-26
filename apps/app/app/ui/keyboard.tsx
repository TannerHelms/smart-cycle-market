import * as React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';


export function Keyboard(props: { children: React.ReactNode }) {
    return (
        <KeyboardAvoidingView className='flex-1' behavior='padding'>
            <ScrollView>
                {props.children}
            </ScrollView >
        </KeyboardAvoidingView>
    );
}
