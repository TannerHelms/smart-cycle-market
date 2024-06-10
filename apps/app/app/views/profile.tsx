import { ProfileOptionsListItem } from '@components/profile-options-list-item';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Avatar } from '@ui/avatar';
import { Col, Row } from '@ui/core';
import { Divider } from '@ui/divider';
import { SafeAreaView } from '@ui/safe-area-view';
import colors from '@utils/colors';
import { size } from '@utils/size';
import useAuth from 'app/hooks/use-auth';
import { ProfileStackParamList } from 'app/navigator/profile-navigator';
import { text } from 'express';
import * as React from 'react';
import { Pressable, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export interface ProfileProps {
}

export function Profile(props: ProfileProps) {
    const { authState, signOut, updateUser, verifyToken, loadingProfile, getProfile } = useAuth()
    const { profile } = authState
    const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>()
    const [userName, setUserName] = React.useState(profile?.name || '')

    const isNameChanged = profile?.name !== userName && userName.trim().length > 0

    const onSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.log(error)
        }
    }

    const onMessagePress = () => {
        navigate("Chats")
    }

    const onListingPress = () => {
        navigate("Listings")
    }

    return (
        <SafeAreaView>
            <ScrollView refreshControl={<RefreshControl refreshing={loadingProfile} onRefresh={getProfile} />}>
                {!profile?.verified && (
                    <View className='py-3 bg-deActive rounded-md my-4 p-5'>
                        <Text className='text-lg font-semibold text-primary text-center'>It looks like your profile isnt verified.</Text>
                        <Text onPress={verifyToken} className='text-center text-active text-md font-semibold'>Tap here to get the link.</Text>
                    </View>
                )}
                <Row>
                    <Avatar uri={profile?.avatar} size={50} />
                    <Col style={{ paddingLeft: size.padding }} className='flex-1'>
                        <Row className='justify-between'>
                            <TextInput
                                className='text-primary text-lg font-bold'
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                            />
                            {isNameChanged && (
                                <Pressable onPress={() => {
                                    if (!profile) return
                                    const updatedProfile = { ...profile, name: userName }
                                    updateUser(updatedProfile)
                                }}>
                                    <AntDesign name="check" size={24} color={colors.primary} />
                                </Pressable>
                            )}
                        </Row>
                        <Text className='text-primary pt-2'>{profile?.email}</Text>
                    </Col>
                </Row>
                <Divider />
                <Col>
                    <ProfileOptionsListItem className="pb-6" antIconName='message1' title='Messages' active={true} onPress={onMessagePress} />
                    <ProfileOptionsListItem className="pb-6" antIconName='appstore-o' title='Your Listings' onPress={onListingPress} />
                    <ProfileOptionsListItem className="pb-6" antIconName='logout' title='Log out' onPress={onSignOut} />
                </Col>
            </ScrollView>
        </SafeAreaView>
    );
}
