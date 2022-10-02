import { View, Text, Image, TouchableWithoutFeedback, Touchable, Switch, ScrollView } from 'react-native';
import { useEffect, useState } from 'react'
import { getImgDataByPlanName } from '../data/readweb'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/navbar'
import mapViewRender from '../data/MapViewRender'
import { useNavigation, useIsFocused } from '@react-navigation/native';

const CBDPage = ({ route, navigation }) => {
    const focus = useIsFocused()
    const [isCycleScore, setIsCycleScore] = useState(false);
    const toggleSwitch = () => setIsCycleScore(previousState => !previousState);

    const { plan_name } = route.params;
    const [imgDetails, setImgDetails] = useState(null);

    useEffect(() => {
        if (focus) getImgDetails()
    }, [focus])

    useEffect(() => {
        if (imgDetails != null) renderImage()
        if (imgDetails != null) renderMap()
    }, [isCycleScore])

    const getImgDetails = async () => {
        data = await getImgDataByPlanName(plan_name)
        setImgDetails(data);
    }

    const renderMap = () => {
        return mapViewRender(imgDetails, isCycleScore)
    }

    const renderImage = () => {
        const rendered = []
        let idx=1
        for (let i of imgDetails) {
            rendered.push(
                <View key={i.id} className="my-0 flex-row">
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewImagePage',  {id: i.id})}>
                        <View className="px-4 py-2 m-2 bg-white rounded-lg basis-2/3">
                            <View>
                                <Text className="text-xl font-bold my-1">{"Image " + idx}</Text>
                                <Text className="text-l">Coordinates: {i.coord}</Text>
                                <Text className="text-l">Walk Score: {i.walk_score}</Text>
                                <Text className="text-l mb-1">Bike Score: {i.bike_score}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View className="px-4 py-2 mx-1 my-2 bg-white rounded-lg basis-1/4">
                        <View>
                            <Text className="text-xl font-bold my-1">Score</Text>
                            <Text className="text-4xl">{isCycleScore ? Math.round(i.bike_score) : Math.round(i.walk_score)}</Text>
                        </View>
                    </View>
                </View>
            )
            idx++
        }
        return rendered
    }
    return (
        <View className="flex-1 bg-gray-100 py-8" >
            <View className="py-8 px-8 bg-white rounded-lg flex-row justify-between items-center">
                <Text className="text-3xl text-center font-bold my-2">{plan_name}</Text>
                <FaIcon
                    name="plus"
                    color="#f66"
                    size={30}
                    onPress={() => navigation.navigate('UploadPage', { plan_name })}
                ></FaIcon>
            </View>
            <View className="text-center py-4">
                <View className="flex-row justify-between">
                    <Text className="text-xl text-left ml-5 pt-4 font-bold">{isCycleScore ? 'Cycle Score' : 'Walk Score'}</Text>
                    <Switch
                        className="m-3"
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isCycleScore ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isCycleScore}
                    />
                </View>
                <View className="h-52 w-full my-12 p-4 rounded-3xl">
                    {imgDetails == null ? null : renderMap()}
                </View>
                {/* <Image className="h-56 w-full" source={isCycleScore ? require('../assets/bike_map.png'): require('../assets/walk_map.png')} /> */}
                <ScrollView className="h-52" >
                    {imgDetails == null ? null : renderImage()}
                </ScrollView>
            </View>
            <Navbar />
        </View>
    )
}

export default CBDPage