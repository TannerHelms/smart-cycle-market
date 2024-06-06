import colors from '@utils/colors';
import * as React from 'react';
import { View, Text, Modal, ScrollView, Pressable } from 'react-native';

export interface OptionModalProps<T> {
    visible: boolean,
    onRequestClose: (state: boolean) => void,
    options: T[],
    renderItem: (item: T) => JSX.Element,
    onPress: (items: T) => void
}

export function OptionModal<T extends unknown>({ visible, onRequestClose, options, renderItem, onPress }: OptionModalProps<T>) {

    const handleClose = () => onRequestClose(!visible)

    return (
        <Modal visible={visible} onRequestClose={handleClose} transparent>
            <Pressable onPress={handleClose} className=' flex-1 items-center justify-center p-4 bg-backDrop'>
                <View className='w-full bg-white p-3 rounded-md max-h-[400]'>
                    <ScrollView>
                        {options.map((item, index) => {
                            return (
                                <Pressable key={index} onPress={() => {
                                    onPress(item)
                                    handleClose()
                                }}>
                                    {renderItem(item)}
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                </View>
            </Pressable>
        </Modal>
    );
}
