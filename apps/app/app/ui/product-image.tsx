import { size } from '@utils/size';
import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

export interface ProductImageProps {
    uri?: string
}

const width = Dimensions.get('screen').width
const imageWidth = width - size.safeAreaViewPadding * 2
const aspect = 16 / 9
export function ProductImage({ uri }: ProductImageProps) {
    return (
        <Image source={{ uri }} width={imageWidth} height={imageWidth / aspect} className='rounded-md' resizeMethod='resize' resizeMode='cover' />
    );
}
