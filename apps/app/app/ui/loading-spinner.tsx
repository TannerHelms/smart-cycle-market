import colors from '@utils/colors';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import { View, Text, Modal } from 'react-native';

export interface LoadingSpinnerProps {
    visible: boolean;
}

export function LoadingSpinner({ visible }: LoadingSpinnerProps) {
    if (!visible) return null;
    return (
        <Modal animationType='fade' transparent>
            <View className='flex-1' style={{ backgroundColor: colors.backDrop }}>
                <LottieView
                    source={require('@assets/loading.json')}
                    autoPlay={true}
                    loop
                    style={{ flex: 1, transform: [{ scale: 0.2 }] }}
                />
            </View>
        </Modal>
    );
}
