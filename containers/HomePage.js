import { View, Text, Image, TouchableWithoutFeedback, Touchable, Switch } from 'react-native';
import { useState } from 'react'
import Navbar from '../components/navbar'

const HomePage = () => {

    const [isCycleScore, setIsCycleScore] = useState(false);
    const toggleSwitch = () => setIsCycleScore(previousState => !previousState);

    return (
        <View className="flex-1 bg-gray-100 py-8" >
            <View className="py-8 bg-white rounded-lg">
                <Text className="text-2xl text-center font-bold my-2">ADAP</Text>
                <Text className="text-xs text-center">Assessment Data | Visualisation | Urban Planning</Text>
            </View>
            <View className="text-center px-2 py-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl text-left m-4 py-4 font-bold">{isCycleScore ? 'Cycle Score': 'Walk Score'}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isCycleScore ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isCycleScore}
                    />
                </View>
                <Image className="h-56 w-full rounded-3xl" source={isCycleScore ? require('../assets/bike_map.png'): require('../assets/walk_map.png')} />
            </View>
            <Navbar/>
        </View>
    )
}

export default HomePage