import { Avatar } from '@ui/avatar';
import { Row } from '@ui/core';
import { formatDate } from '@utils/date';
import { formatPrice } from '@utils/helper';
import { size } from '@utils/size';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Product } from 'types/product';
import { ImageSlider } from './image-slider';

export interface ProductDetailProps {
    product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
    return (
        <View className='flex-1'>
            <ScrollView>
                <ImageSlider images={product.images} />
                <Text className='mt-4 text-primary font-bold'>{product.category}</Text>
                <Text className='text-active font-bold text-lg'>{formatPrice(product.price)}</Text>
                <Text className='text-active font-bold'>Purchased On {formatDate(product.purchasingDate as unknown as string, 'dd LLL yyyy')}</Text>
                <Text className='mt-4 text-primary font-bold text-lg tracking-wide'>{product.name}</Text>
                <Text className='mt-1 text-primary'>{product.description}</Text>

                <Row className='mt-6'>
                    <Avatar uri={product.owner.avatar?.url} size={50} />
                    <Text className='text-primary pl-4 font-bold '>{product.owner.name}</Text>
                </Row>
            </ScrollView>
        </View>
    );
}
