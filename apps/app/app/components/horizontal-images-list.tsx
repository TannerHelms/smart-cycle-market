import * as React from 'react';
import { View, Text, FlatList, Image, Pressable, StyleProp, ViewStyle } from 'react-native';

export interface HorizontalImageListProps {
    images: string[]
    onPress?: (item: string) => void,
    onLongPress?: (item: string) => void
    style?: StyleProp<ViewStyle>
}

export function HorizontalImageList({ images, onPress, onLongPress, style }: HorizontalImageListProps) {
    return (
        <FlatList contentContainerStyle={style} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item} data={images} renderItem={({ item }) => {
            return (
                <Pressable
                    onPress={() => onPress && onPress(item)}
                    onLongPress={() => onLongPress && onLongPress(item)}
                    className='overflow-auto w-[70] h-[70] rounded-md ml-2'>
                    <Image source={{ uri: item }} className=' flex-1' />
                </Pressable >
            )
        }} />
    );
}
