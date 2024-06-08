import { useNavigation } from '@react-navigation/native';
import { Row } from '@ui/core';
import { size } from '@utils/size';
import * as React from 'react';
import { View, Text, Pressable } from 'react-native';

export interface AppHeaderProps {
    backButton?: JSX.Element;
    center?: JSX.Element;
    right?: JSX.Element;
}

export function AppHeader({ center, right, backButton }: AppHeaderProps) {
    const { goBack, canGoBack } = useNavigation();
    return (
        <Row className='justify-between' style={{ paddingBottom: size.padding }}>
            {canGoBack() && (
                <Pressable onPress={goBack}>
                    {backButton}
                </Pressable>
            )}
            {center}
            {right}
        </Row>
    );
}
