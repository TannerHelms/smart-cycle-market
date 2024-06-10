
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { statusBarPadding } from '@utils/status-bar';
import { ChatWindow } from '@views/chat-window';
import { Chats } from '@views/chats';
import { ListingDetails } from '@views/listing-details';
import { Listings } from '@views/listings';
import { Profile } from '@views/profile';
import * as React from 'react';
import { Product } from 'types/product';

export type ProfileStackParamList = {
    Profile: undefined;
    Chats: undefined;
    Listings: undefined;
    ListingDetails: { product?: Product };
    ChatWindow: undefined;
}

const Stack = createNativeStackNavigator<ProfileStackParamList>();


export interface ProfileNavigatorProps {
}

export function ProfileNavigator(props: ProfileNavigatorProps) {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
                contentStyle: { paddingTop: statusBarPadding }
            }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="Listings" component={Listings} />
            <Stack.Screen name="ListingDetails" component={ListingDetails} />
            <Stack.Screen name="ChatWindow" component={ChatWindow} />
        </Stack.Navigator>
    );
}
