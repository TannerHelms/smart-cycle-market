import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export interface AvatarProps {
    url?: string,
    uri?: string,
    size?: number,
}

export function Avatar({ url, uri, size = 50 }: AvatarProps) {
    const iconContainerSize = size * 0.7
    const iconSize = size * .8
    return (
        <View className={`items-center rounded-full ${!uri && 'bg-primary items-center justify-center'}`} style={{ width: size, height: size }} >
            {uri && (
                <Image source={{ uri: uri }} className='flex-1' />
            )}
            {!uri && (
                <View style={{ width: iconContainerSize, height: iconContainerSize }} className='items-center justify-center overflow-hidden rounded-full'>
                    <FontAwesome name='user' size={iconSize} color="white" />
                </View>
            )}
        </View>
    );
}
