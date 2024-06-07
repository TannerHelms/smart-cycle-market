import { statusBarPadding } from '@utils/status-bar';
import * as React from 'react';
import { SafeAreaView as View } from 'react-native-safe-area-context';

export interface SafeAreaViewProps {
    children: React.ReactNode
}

export function SafeAreaView(props: SafeAreaViewProps) {
    return (
        <View style={{ paddingTop: statusBarPadding }} className='mt-5 px-5'>
            {props.children}
        </View>
    );
}
