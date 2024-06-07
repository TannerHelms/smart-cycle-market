import * as React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Row } from '@ui/core';
import { size } from '@utils/size';
import colors from '@utils/colors';

export interface ProfileOptionsListItemProps extends PressableProps {
    antIconName: string;
    title: string;
    onPress?: () => void;
    className?: string;
    active?: boolean;
}

export function ProfileOptionsListItem(props: ProfileOptionsListItemProps) {
    return (
        <Pressable className='flex-row items-center justify-between' onPress={props.onPress} style={props.style}>
            <Row>
                <AntDesign name={props.antIconName as any} size={30} color={props.active ? colors.active : colors.primary} />
                <Text style={{ color: props.active ? colors.active : colors.primary }} className='text-primary text-lg pl-5'>{props.title}</Text>
            </Row>
            {props.active && (
                <View className='h-3 w-3 rounded-full bg-blue-400'></View>
            )}
        </Pressable>
    );
}
