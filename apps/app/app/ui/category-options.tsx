import { Category } from '@utils/categories';
import * as React from 'react';
import { View, Text } from 'react-native';

export interface CategoryOptionProps {
    item: {
        icon: JSX.Element,
        name: string
    }
}

export function CategoryOption({ item }: CategoryOptionProps) {
    return (
        <View className='flex-row items-center'>
            <View style={{ transform: [{ scale: 0.5 }] }}>
                {item.icon}
            </View>
            <Text className='text-primary py-5'>{(item as Category).name}</Text>
        </View>
    );
}
