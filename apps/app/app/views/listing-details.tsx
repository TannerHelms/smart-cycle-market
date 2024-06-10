import { AppHeader } from '@components/app-header';
import { ProductDetail } from '@components/product-detail';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackButton } from '@ui/back-button';
import { SafeAreaView } from '@ui/safe-area-view';
import useAuth from 'app/hooks/use-auth';
import { ProfileNavigatorProps, ProfileStackParamList } from 'app/navigator/profile-navigator';
import * as React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@utils/colors';
import { OptionButton } from '@ui/option-button';
import { Feather, } from "@expo/vector-icons";
import { OptionModal } from '@components/option-modal';
import { Row } from '@ui/core';
import useClient from 'app/hooks/use-client';
import { useListings } from 'app/hooks/use-product';
import { LoadingSpinner } from '@ui/loading-spinner';
import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native';

type ListingDetailsProps = NativeStackScreenProps<ProfileStackParamList, 'ListingDetails'>


const menuOptions = [
    {
        name: "Edit",
        icon: <Feather name="edit" size={20} color={colors.primary} />,
    },
    {
        name: "Delete",
        icon: <Feather name="trash-2" size={20} color={colors.primary} />,
    },
];

export function ListingDetails(props: ListingDetailsProps) {
    const [showMenu, setShowMenu] = React.useState(false)
    const { deleteListing } = useListings()
    const [loading, setLoading] = React.useState(false)
    const { authState } = useAuth()
    const product = props.route.params.product
    const isAdmin = authState.profile?.id === product?.owner._id
    const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>()

    const confirmDelete = async () => {
        setLoading(true)
        const res = await deleteListing(product!!._id)
        setLoading(false)
        if (res) {
            props.navigation.goBack()
        }
    }

    const onDeletePress = () => {
        Alert.alert(
            "Are you sure?",
            "This action will remove this product",
            [
                { text: "Delete", style: "destructive", onPress: confirmDelete },
                { text: "Cancel", style: "cancel" }
            ],
        )
    }

    return (
        <SafeAreaView>
            <AppHeader backButton={<BackButton />} right={<OptionButton visible={isAdmin} onPress={() => setShowMenu(true)} />} />
            {product && (
                <>
                    <ProductDetail product={product} />
                    <Pressable className='w-[50] h-[50] items-center justify-center rounded-full bg-active absolute bottom-5 right-5' onPress={() => navigate("ChatWindow")}>
                        <AntDesign name="message1" size={20} color="white" />
                    </Pressable>
                </>
            )}
            <OptionModal
                options={menuOptions}
                renderItem={({ name, icon }) => (
                    <Row className='py-3'>
                        {icon}
                        <Text className='pl-2 text-primary'>{name}</Text>
                    </Row>
                )
                }
                visible={showMenu}
                onRequestClose={setShowMenu}
                onPress={(option) => {
                    if (option.name === "Delete") {
                        onDeletePress()
                    }
                }}
            />
            <LoadingSpinner visible={loading} />
        </SafeAreaView>
    );
}
