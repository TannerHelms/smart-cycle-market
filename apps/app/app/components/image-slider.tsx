import { ProductImage } from '@ui/product-image';
import * as React from 'react';
import { View, Text, FlatList, Image, ViewToken } from 'react-native';
import { productImage } from 'types/product';

export interface ImageSliderProps {
    images: productImage[]
}

export function ImageSlider({ images }: ImageSliderProps) {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const viewableConfig = React.useRef({ itemVisiblePercentThreshold: 50 })
    const onViewableItemsChanged = React.useRef(((info: {
        viewableItems: ViewToken<productImage>[];
        changed: ViewToken<productImage>[];
    }) => {
        setActiveIndex(info.viewableItems[0].index || 0)
    }))
    return (
        <View>
            <FlatList
                contentContainerStyle={{ position: 'relative' }}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                data={images}
                renderItem={({ item }) => (
                    <ProductImage uri={item.url} />
                )}
                viewabilityConfig={viewableConfig.current}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
            <View className='absolute w-9 h-6 bg-backDrop items-center justify-center rounded-md right-3 bottom-3'>
                <Text className='text-white font-bold'>{activeIndex + 1} / {images.length}</Text>
            </View>
        </View>
    );
}
