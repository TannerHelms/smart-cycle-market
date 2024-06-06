import { statusBarPadding } from '@utils/status-bar';
import * as React from 'react';
import { SafeAreaView as View } from 'react-native-safe-area-context';

export interface SafeAreaViewProps {
    children: React.ReactNode
}

export function SafeAreaView(props: SafeAreaViewProps) {
    return (
        <View style={{ paddingTop: statusBarPadding }} className='p-2'>
            {props.children}
        </View>
    );
}
