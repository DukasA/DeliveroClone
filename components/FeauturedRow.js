import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import client from '../sanity'
import RestaurantCard from './RestaurantCard'

const FeauturedRow = ({id, title, description}) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        client.fetch(`
            *[_type == "feautured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type-> {
                        name
                    }
                },
            }[0]
        `,{ id }
        ).then(data => {
            setRestaurants(data?.restaurants)
        })
    }, [])

    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <Image 
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/143/143270.png'
                    }}
                    className='w-10 h-4'
                />
            </View>
            <Text className='text-xs text-gray-500 px-4'>
                {description}
            </Text>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {/* RestaurantCards */}

                {restaurants?.map((restaurant) => (
                    <RestaurantCard 
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeauturedRow
