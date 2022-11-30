import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import Categories from '../components/Categories'
import FeauturedRow from '../components/FeauturedRow'
import client from '../sanity'

export const HomeScreen = () => {
    const navigation = useNavigation()
    const [feauturedCategories, setFeauturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        client.fetch(`
        *[_type == "feautured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }
        `).then(data => {
            setFeauturedCategories(data)
        })
    },[])

    return (
        <SafeAreaView className='pt-5 '>
                <View className='bg-white'>
                    {/* Header */}
                    <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                        <Image 
                            source={{
                                uri: 'https://links.papareact.com/wru'
                            }} 
                            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                        />
                        <View className="flex-1">
                            <Text className='fonr-bold text-gray-400 tetx-xs'>Deliver Now!</Text>
                            <Text className='font-bold text-xl'>Current Location
                            </Text>
                        </View>
                        <Image 
                            source={{
                                uri: 'https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png'
                            }} 
                            className='h-10 w-10'
                        />
                    </View>

                    {/* Search */}
                    <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3 items-center'>
                            <Image 
                                source={{
                                    uri: 'https://www.clipartmax.com/png/middle/161-1616455_search-search-icon-grey.png'
                                }} 
                                className='h-5 w-5'
                            />
                            <TextInput
                                placeholder='Restaurants and cuisines' 
                                keyboardType='default'
                                className='color-black'
                            />
                        </View>
                        <Image 
                            source={{
                                uri: 'http://primedepartamentos.com/images/icons/adjust-icon.png'
                            }} 
                            className='h-6 w-6'
                        />
                    </View>
                </View>

                {/* Body */}
                <ScrollView>

                    {/* Categories */}
                    <Categories />

                    {feauturedCategories?.map((category) => (
                        <FeauturedRow
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                        />
                    ))}
                    
                </ScrollView>
        </SafeAreaView>
        
    )
}


