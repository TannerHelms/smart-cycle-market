import * as React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@utils/colors';
import { Row } from './core';

export interface BackButtonProps {
}

export function BackButton(props: BackButtonProps) {
    return (
        <Row>
            <Ionicons name="arrow-back" size={25} color={colors.active} />
            <Text className='pl-2 text-lg' style={{ color: colors.active }}>Go Back</Text>
        </Row>
    );
}
