import * as React from 'react';
import { View, Text, Pressable } from 'react-native';

export interface FormNavigatorProps {
    leftTitle: string;
    rightTitle: string;
    leftAction: () => void;
    rightAction: () => void;
}

export function FormNavigator({ leftTitle, rightTitle, leftAction, rightAction }: FormNavigatorProps) {
    return (
        <View className='w-100 flex-row justify-between'>
            <Pressable onPress={leftAction}>
                <Text>{leftTitle}</Text>
            </Pressable>
            <Pressable onPress={rightAction}>
                <Text>{rightTitle}</Text>
            </Pressable>
        </View>
    );
}
