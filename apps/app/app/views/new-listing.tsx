import { HorizontalImageList } from '@components/horizontal-images-list';
import { OptionModal } from '@components/option-modal';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Button from '@ui/button';
import { CategoryOption } from '@ui/category-options';
import { DatePicker } from '@ui/date-picker';
import { Keyboard } from '@ui/keyboard';
import { SafeAreaView } from '@ui/safe-area-view';
import categories from '@utils/categories';
import colors from '@utils/colors';
import { FormInput } from '@utils/text';
import { newProductSchema, yupValidate } from '@utils/validator';
import { runAxiosAsync } from 'app/api/run-axios-async';
import useClient from 'app/hooks/use-client';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
export interface NewListingProps {
}


const defaultInfo = {
    name: '',
    description: '',
    category: "",
    price: '',
    purchasingDate: new Date()
}

const imageOptions = [
    {
        value: 'Remove Image',
        id: 'remove'
    }
]

export function NewListing(props: NewListingProps) {
    const { authClient } = useClient()
    const [productInfo, setProductInfo] = React.useState(defaultInfo)
    const [showCategory, setShowCategory] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState('')
    const [showImageOptions, setShowImageOptions] = React.useState(false)
    const [images, setImages] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState(false)

    const { category, name, description, price, purchasingDate } = productInfo


    const handleChange = (name: string) => {
        return (text: string) => {
            setProductInfo({
                ...productInfo,
                [name]: text
            })
        }
    }

    const handleSubmit = async () => {
        const { values, error } = await yupValidate(newProductSchema, productInfo)
        if (error) return showMessage({ message: error, type: 'danger' })

        const form = new FormData();

        type productInfoKeys = keyof typeof productInfo

        for (let key in productInfo) {
            const value = productInfo[key as productInfoKeys]
            if (value instanceof Date) {
                form.append(key, value.toISOString())
            } else {
                form.append(key, value)
            }
        }

        const newImages = images.map((img, index) => ({

            name: 'image_' + index,
            type: mime.getType(img),
            uri: img
        }))

        for (let img of newImages) {
            form.append('images', img as any)
        }
        setLoading(true)
        const res = await runAxiosAsync<{ message: string }>(authClient.post('/product', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }))
        setLoading(false)
        if (res) showMessage({ message: "Product created successfully!", type: 'success' })
        setProductInfo(defaultInfo)
        setImages([])
    }

    const handleOnImageSelection = async () => {
        try {
            const { assets } = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.3,
                allowsMultipleSelection: true
            })
            if (!assets) return
            const imageUris = assets.map(({ uri }) => uri)
            setImages([...images, ...imageUris])
        } catch (error) {
            showMessage({ message: (error as any).message, type: 'danger' })
        }
    }

    return (
        <Keyboard>
            <SafeAreaView>

                <View className='flex-row'>
                    <Pressable className='mb-3' onPress={handleOnImageSelection}>
                        <View className='items-center justify-center mb-3 w-[70] h-[70] border-2 rounded-md' style={{ borderColor: colors.primary }}>
                            <FontAwesome5 name='images' size={24} />
                        </View>
                        <Text style={{ color: colors.primary }}>Add Images</Text>
                    </Pressable>
                    <HorizontalImageList images={images} onLongPress={(img) => {
                        setSelectedImage(img)
                        setShowImageOptions(true)
                    }} />
                </View>
                <FormInput placeholder='Product Name' value={name} onChangeText={handleChange('name')} />
                <FormInput placeholder='Price' value={price} onChangeText={handleChange('price')} keyboardType='numeric' />
                <DatePicker title='Purchasing Date: ' value={purchasingDate} onChange={purchasingDate => {
                    setProductInfo({
                        ...productInfo,
                        purchasingDate
                    })
                }} />

                <Pressable className='flex-row items-center justify-between p-2 rounded-md border border-deActive mb-4' onPress={() => setShowCategory(true)}>
                    <Text className='text-primary'>{category || "Category"}</Text>
                    <AntDesign name='caretdown' color={colors.primary} />
                </Pressable>
                <OptionModal
                    visible={showCategory}
                    onRequestClose={setShowCategory}
                    options={categories}
                    renderItem={item => {
                        return (
                            <CategoryOption item={item} />
                        )
                    }}
                    onPress={(item) => {
                        setProductInfo({
                            ...productInfo,
                            category: item.name
                        })
                    }}
                />
                <OptionModal
                    visible={showImageOptions}
                    onRequestClose={setShowImageOptions}
                    options={imageOptions}
                    renderItem={item => {
                        return (
                            <Text className='font-bold text-md text-primary p-5'>{item.value}</Text>
                        )
                    }}
                    onPress={(option) => {
                        if (option.id === 'remove') {
                            const newImages = images.filter(img => img !== selectedImage)
                            setImages(newImages)
                        }
                    }}
                />
                <FormInput placeholder='description' value={description} multiline numberOfLines={4} onChangeText={handleChange('description')} />
                <Button title='List Product' onPress={handleSubmit} loading={loading} />
            </SafeAreaView >
        </Keyboard>
    );
}
