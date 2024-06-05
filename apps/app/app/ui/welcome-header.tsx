import { H1, H2 } from '@utils/text';
import * as React from 'react';
import { Image, Text, View } from 'react-native';

export interface WelcomeHeaderProps {
}

const heading = "Online Marketplace for Used Goods"
const subHeading = "Buy or sell user good with trust. Chat directly with sellers, ensuraing a seamless transaction."

export function WelcomeHeader(props: WelcomeHeaderProps) {
    return (
        <View className='items-center'>
            <Image
                className='w-[250px] h-[250px]'
                source={require('@assets/hero.png')}
                resizeMode='contain'
                resizeMethod='resize'
            />
            <H1>{heading}</H1>
            <H2>{subHeading}</H2>
        </View>
    );
}
