import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@utils/colors';

export interface OptionButtonProps {
    visible?: boolean
    onPress?: () => void
}

export function OptionButton({ onPress, visible }: OptionButtonProps) {
    if (!visible) return null
    return (
        <Pressable onPress={onPress}>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color={colors.primary} />
        </Pressable>
    );
}
