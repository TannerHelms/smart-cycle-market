import { View, Text, Platform, Pressable } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from 'react';
import { formatDate } from '@utils/date';
import colors from '@utils/colors';
export interface DatePickerProps {
    title: string,
    value: Date,
    onChange: (date: Date) => void
}

const isIOS = Platform.OS === 'ios'

export function DatePicker(props: DatePickerProps) {
    const [showPicker, setShowPicker] = useState(false)
    const visible = isIOS ? true : showPicker

    const onPress = () => {
        if (isIOS) return
        setShowPicker(!showPicker)
    }

    return (
        <Pressable onPress={onPress} className='flex-row items-center w-full mb-4' style={{ padding: isIOS ? 0 : 8, borderWidth: isIOS ? 0 : 1, borderColor: colors.deActive, borderRadius: 5 }}>
            <Text className='text-primary'>{props.title}</Text>
            {!isIOS && <Text className='text-primary' style={{ paddingLeft: 15 }}>{formatDate(props.value.toISOString(), "dd LLL yyyy")}</Text>}
            {visible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.value}
                    onChange={((_, date) => {
                        if (date) props.onChange(date)
                        if (!isIOS) setShowPicker(false)
                    })}
                />
            )}
        </Pressable>
    );
}
