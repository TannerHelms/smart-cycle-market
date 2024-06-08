import { AppHeader } from '@components/app-header';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BackButton } from '@ui/back-button';
import { ProductImage } from '@ui/product-image';
import { SafeAreaView } from '@ui/safe-area-view';
import { size } from '@utils/size';
import { runAxiosAsync } from 'app/api/run-axios-async';
import useClient from 'app/hooks/use-client';
import { useListings } from 'app/hooks/use-product';
import { ProfileNavigatorProps, ProfileStackParamList } from 'app/navigator/profile-navigator';
import * as React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { ProductDocument } from 'types/product';

export interface ListingsProps {
}

export function Listings(props: ListingsProps) {
    const { listings, loading } = useListings()
    const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>()

    return (
        <SafeAreaView>
            <AppHeader backButton={<BackButton />} />
            <View className='h-full'>
                <FlatList data={listings} contentContainerStyle={{ paddingBottom: 10 }} keyExtractor={(item) => item._id} renderItem={({ item }) => {
                    return (
                        <Pressable style={{ marginBottom: size.padding }} onPress={() => navigate("ListingDetails", { product: item })}>
                            <ProductImage uri={item.thumbnail} />
                            <Text className='font-bold text-lg mt-2 tracking-wide' numberOfLines={2}>{item.name}</Text>
                        </Pressable>
                    )
                }} />
            </View>
        </SafeAreaView>
    );
}
