import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import BasketIcon from '../components/BasketIcon'
import DishRow from '../components/DishRow'
import { setRestaurant } from '../feautures/restaurantSlice'
import { urlFor } from '../sanity'

const RestaurantScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
    }} = useRoute()

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }, [dispatch]))
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className='relative'>
                    <Image 
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        className='w-full h-56 bg-gray-300 p-4'
                    />
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'
                    >
                        <Image 
                            source={{
                                uri: 'https://toppng.com//public/uploads/preview/left-right-arrow-button-png-left-arrow-icon-sv-11562991530uuomzdoifr.png'
                            }}
                            className='w-7 h-7'
                        />
                    </TouchableOpacity>
                </View>
                <View className='bg-white'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold'>{title}</Text>
                        <View className='flex-row space-x-2 my-1'>
                            <View className='flex-row items-center space-x-1'>
                                <Image 
                                    source={{
                                        uri: 'https://affaso.com/wp-content/uploads/2020/06/5-point-stars-png-star-icon-flat-11562958768wpf63hu4tq.png'
                                    }}
                                    className='h-6 w-6 opacity-70'
                                />
                                <Text className='text-xs text-gray-500'>
                                    <Text className='text-green-500'>{rating}</Text> · {genre}
                                </Text>

                                <View className='flex-row items-center space-x-1'>
                                    <Image 
                                        source={{
                                            uri: 'https://www.clipartmax.com/png/middle/215-2158499_map-marker-icons-transparent-background-location-logo.png'
                                        }}
                                        className='h-6 w-6 opacity-60'
                                    />
                                    <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
                                </View>
                            </View>
                        </View>
                        <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
                    </View> 
                    <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                            <Image 
                                source={{
                                    uri: 'https://banner2.cleanpng.com/20171218/621/question-mark-png-5a3813d34eadf5.2716127515136245313223.jpg'
                                }}
                                className='h-7 w-7 opacity-60'
                            />
                            <Text className='pl-2 flex-1 text-md font-bold'>
                                Have a food alergy?
                            </Text>
                            <Image 
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/143/143270.png'
                                }}
                                className='w-10 h-4'
                            />
                    </TouchableOpacity>
                </View>

                <View className='pb-36'>
                    <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

                    {dishes.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen
