import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import logo from '../assets/logo.jpg';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/navbar';


const AboutPage = () => {
    const logoImg = Image.resolveAssetSource(logo).uri;
    return (
        <View className="flex-1 bg-white py-8">
            <View className="py-8 px-8 bg-white max-h-40 border-b-0.5">
                <Text className="text-2xl text-center text-black font-bold my-2">About Us</Text>
                <Text className="text-xs text-center text-black">Who we are!</Text>
            </View>
            <View className="flex-col p-4 items-center">
                <Image className="h-32 w-screen" source={{uri: logoImg}} />
                <View className="flex-row justify-center items-center">
                    <FaIcon name="rocket" icon="fa-solid fa-rocket-launch" size={30} color="#f66"/>
                    <Text className="py-8 px-2 text-2xl text-center font-bold">Our Team:</Text>
                </View>
                <Text className="py-2 text-2xl text-center">Nicholas</Text>
                <Text className="py-2 text-2xl text-center">Hui Xiang</Text>
                <Text className="py-2 text-2xl text-center">Sui Kiat</Text>
                <Text className="py-2 text-2xl text-center">Yu Fei</Text>
                <Text className="py-2 text-2xl text-center">Dao Zheng</Text>
                <Text className="py-2 text-2xl text-center">Marc</Text>
            </View>
            <Navbar />
        </View>
    )
}

export default AboutPage