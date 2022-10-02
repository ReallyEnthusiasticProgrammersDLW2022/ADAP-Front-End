import { View, Text, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/navbar';
import { getSingleImg } from '../data/readweb'
import { useNavigation } from '@react-navigation/native';


const ViewImagePage = ({ route }) => {
    const navigation = useNavigation()
    const [isSegmentedImage, setisSegmentedImage] = useState(false);
    const toggleSwitch = () => setisSegmentedImage(previousState => !previousState);
    const { id } = route.params;
    const [res, setRes] = useState(null)

    useEffect(() => {
        getImg(id)
    }, [])

    useEffect(() => {
        if (res != null) render()
    }, [res])

    const render = () => (
        <View>
            <Image className="h-56 w-full rounded-3xl" source={{ uri: (isSegmentedImage ? res[1] : res[0]) }} />
            <View className="px-4 py-2 m-2 bg-white rounded-lg">
                {/* <Text className="text-xl font-bold my-1">{res[2].location}</Text> */}
                <Text className="text-lg">Coordinates: {res[2].coord}</Text>
                <Text className="text-lg">Walk Score: {Math.round(res[2].walk_score)}</Text>
                <Text className="text-lg">Bike Score: {Math.round(res[2].bike_score)}</Text>
            </View>
        </View>
    )

    const getImg = async (id) => {
        setRes(await getSingleImg(id))
    }

    return (
        <View className="flex-1 bg-gray-100 py-8">
            <View className="py-8 px-8 bg-white max-h-40 border-b-0.5">
                <Text className="text-2xl text-center text-black font-bold my-2">Image</Text>
            </View>

            <View className="flex-col p-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl text-left m-4 py-4 font-bold">{isSegmentedImage ? 'Segmented' : 'Non-segmented'}</Text>
                    <Switch
                        className="m-3"
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isSegmentedImage ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isSegmentedImage}
                    />
                </View>
                {res == null ? null : render()}
                <View className="items-center">
                    <TouchableOpacity className="rounded-3xl w-72 justify-center bg-red-500 active:bg-red-600" activeOpacity={1.0} onPress={() => navigation.navigate('CBDPage', { plan_name: res[2].plan_name })} >
                        <Text className="py-4 text-center text-xl text-white">Return</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Navbar />
        </View>
    )
}

export default ViewImagePage