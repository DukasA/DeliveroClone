import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../feautures/restaurantSlice'
import MapView, {Marker} from 'react-native-maps'

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)

    return (
        <View className='bg-[#00CCBB] flex-1 pt-10'>
            <SafeAreaView className='z-50'>
                <View className='flex-row justify-between items-center p-5'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        className=' rounded-full'
                    >
                        <Image 
                            source={{
                                uri: 'https://www.citypng.com/public/uploads/small/31631915015nma32ogrwkba3eha8tltojvhescglzdsmttjlyqdytxnqilfprqefneihmddooqxilqcnzqvbwco2kb4kapiveawxoctt43qe1ym.png'
                            }}
                            className='w-14 h-14 rounded-full opacity-70 '
                        />
                    </TouchableOpacity>
                    <Text className='font-light text-white text-lg'>Order Help</Text>
                </View>

                <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
                    <View className='flex-row justify-between'>
                        <View>
                            <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                            <Text className='text-4xl font-bold'>45-50 Minutes</Text>
                        </View>
                        <Image 
                            source={{
                                uri: 'https://links.papareact.com/fls'
                            }}
                            className='h-20 w-20'
                        />
                    </View>
                    
                    <Text className='mt-3 text-gray-500'>
                        Your order at {restaurant.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                className='flex-1 mt-10 z-0'
                mapType="mutedStandard"
            >
                <Marker  
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    identifier='origin'
                    pinColor="#00CCBB"
                />
            </MapView>

            <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
                />
                <View className='flex-1'>
                    <Text className='text-lg'>Jajko Drochych</Text>
                    <Text className='text-gray-400'>Your Rider</Text>
                </View>

                <Text className='text-[#00CCBB] mr-5 text-lg font-bold'> Call</Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen
