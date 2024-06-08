import { AppHeader } from '@components/app-header';
import { BackButton } from '@ui/back-button';
import { SafeAreaView } from '@ui/safe-area-view';
import * as React from 'react';
import { View, Text } from 'react-native';

export interface ChatsProps {
}

export function Chats(props: ChatsProps) {
    return (
        <SafeAreaView>
            <AppHeader backButton={<BackButton />} />
        </SafeAreaView>
    );
}
