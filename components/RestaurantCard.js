import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { urlFor } from '../sanity'

const RestaurantCard = ({
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

}) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            className='bg-white mr-3 shadow'
            onPress={() => navigation.navigate('Restaurant', {
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
            })}
        >
            <Image 
                source={{
                    uri: urlFor(imgUrl).url(),
                }}
                className='h-36 w-64 rounded-sm'
            />
            <View className='px-3 pb-4'>
                <Text className='font-bold text-lg pt-2'>
                    {title}
                </Text>
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
                </View>
                <View className='flex-row items-center space-x-1'>
                    <Image 
                        source={{
                            uri: 'https://www.clipartmax.com/png/middle/215-2158499_map-marker-icons-transparent-background-location-logo.png'
                        }}
                        className='h-6 w-6 opacity-70'
                    />
                    <Text className='text-xs text-gray-500'>Nearby · {address} </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard
