import colors from '@utils/colors';
import * as React from 'react';
import { ColorValue, DimensionValue, View } from 'react-native';

export interface DividerProps {
    width?: DimensionValue;
    height?: DimensionValue;
    color?: ColorValue;
}

export function Divider({ width = '50%', height = 2, color = colors.deActive }: DividerProps) {
    return (
        <View style={{ width, height, backgroundColor: color, alignSelf: 'center', marginVertical: 30 }} />
    );
}
