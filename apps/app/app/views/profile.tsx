import { ProfileOptionsListItem } from '@components/profile-options-list-item';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Avatar } from '@ui/avatar';
import { Col, Row } from '@ui/core';
import { Divider } from '@ui/divider';
import { SafeAreaView } from '@ui/safe-area-view';
import { size } from '@utils/size';
import useAuth from 'app/hooks/use-auth';
import { ProfileStackParamList } from 'app/navigator/profile-navigator';
import * as React from 'react';
import { ScrollView, Text } from 'react-native';

export interface ProfileProps {
}

export function Profile(props: ProfileProps) {
    const { authState } = useAuth()
    const { signOut } = useAuth()
    const { profile } = authState
    const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>()

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
            <ScrollView>
                <Row>
                    <Avatar uri={profile?.avatar} size={50} />
                    <Col style={{ paddingLeft: size.padding }}>
                        <Text className='text-primary text-lg font-bold'>{profile?.name}</Text>
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
