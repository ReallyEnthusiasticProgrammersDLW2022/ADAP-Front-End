import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/navbar'

const PricingPage = () => {
    return (
        <View className="flex-1 bg-gray-100 py-8">
            <View className="py-8 px-8 bg-white rounded-lg">
                <Text className="text-2xl text-center font-bold my-2">Pricing</Text>
                <Text className="text-xs text-center">Help to furthur our development!</Text>
            </View>
            <View className="py-4 content-center">
                <View className="py-4 flex-row justify-evenly" >
                    <View className="bg-white w-40 h-60 justify-center rounded-2xl bg-rose-300">
                        <Text className="text-3xl text-center font-bold">3-Day Trial</Text>
                        <Text className="text-xl text-center">Free</Text>
                    </View>
                    <View className="bg-white w-40 h-60 justify-center rounded-2xl bg-red-400">
                        <Text className="text-3xl text-center font-bold">One Month</Text>
                        <Text className="text-xl text-center">$xx.99</Text>
                    </View>
                </View>
                <View className="py-4 flex-row justify-evenly" >
                    <View className="bg-white w-40 h-60 justify-center rounded-2xl bg-rose-400">
                        <Text className="text-3xl text-center font-bold">One Year</Text>
                        <Text className="text-xl text-center">$xxx.99</Text>
                    </View>
                    <View className="bg-white w-40 h-60 justify-center rounded-2xl bg-red-400">
                        <Text className="text-3xl text-center font-bold">5 Years</Text>
                        <Text className="text-xl text-center">$xxxx.99</Text>
                    </View>
                </View>
            </View>
            <Navbar />
        </View>
    )
}

export default PricingPage