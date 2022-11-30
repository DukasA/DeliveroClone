import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../feautures/basketSlice'
import { urlFor } from '../sanity'

const DishRow = ({id, name, description, price, image}) => {

    const [isPressed, setisPressed] = useState(false)
    const items = useSelector(state => selectBasketItemsWithId(state, id))
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0) return

        dispatch(removeFromBasket({ id }))
    }

    return (
        <>
        <TouchableOpacity onPress={() => setisPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}>
            <View className='flex-row items-center'>
                <View className='flex-1 pr-2'>
                    <Text className='text-lg mb-1'>{name}</Text>
                    <Text className='text-gray-400'>{description}</Text>
                    <Text>$ {price}</Text>
                </View>
            
                <View>
                    <Image 
                        source={{
                            uri: urlFor(image).url()
                        }} 
                        className='h-20 w-20 bg-gray-300 p-4'
                        style={{
                            borderColor: '#F3F3F4',
                            borderWidth: 1,
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
        {isPressed && (
            <View className='bg-white px-4'>
                <View className='flex-row items-center space-x-4 pb-3'>
                    <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket} className={`w-10 h-10 ${items.length > 0 ? 'bg-cyan-500' : 'bg-gray-400'} rounded-full flex items-center`}>
                        <Text className='color-white font-bold text-2xl'>-</Text>
                    </TouchableOpacity>

                    <Text>{items?.length}</Text>

                    <TouchableOpacity onPress={addItemToBasket} className='w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center'>
                        <Text className='color-white font-bold text-2xl'>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}
        </>
    )
}

export default DishRow
