import { View, Text, Image, TouchableWithoutFeedback, Touchable, Switch, Alert, Button, TextInput } from 'react-native';
import Navbar from '../components/navbar'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { getImgData, getPlans, addNewPlan } from '../data/readweb.js'
import { useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { update } from 'firebase/database';


const RootStack = createNativeStackNavigator();

const ModalNewPlan = () => {
    const navigation = useNavigation();
    const [newPlanName, setNewPlanName] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text className="text-xl text-center font-bold my-2">New Plan Folder</Text>
            <TextInput
                className="h-10 w-32 text-center rounded-2xl bg-white"
                onChangeText={text => setNewPlanName(text)}
                value={newPlanName}
            />

            <Button onPress={() => {
                addNewPlan({ name: newPlanName })
                navigation.goBack()
            }}
                title="Done"
            />
            <Button onPress={() => {
                navigation.goBack()
            }}
                title="Cancel"
            />
        </View>
    )
}

const PlansScreen = () => {
    const focus = useIsFocused()
    const navigation = useNavigation()
    const [plans, setPlans] = useState(null)
    // { Jurong: [], ... }

    useEffect(() => {
        createPlans()
    },[focus])

    useEffect(() => {
        renderPlans()
    }, [])
  
    const createPlans = async () => {
        const images = await getImgData()

        const plansDB = await getPlans()

        const plans = {}
        for (let i of plansDB) {
            for (let j of images) {
                if (!(i.name in plans)) plans[i.name] = []
                if (j.plan_name == i.name) {
                    plans[i.name].push(j)
                }
            }
        }
        // for (let i of images) {
        //     if (! (i.plan_name in plans)) plans[i.plan_name] = []
        //     plans[i.plan_name].push(i)
        // }
        setPlans(plans)
    }

    const renderPlans = () => {
        const rendered = []
        for (let key in plans) {
            rendered.push(
                <TouchableWithoutFeedback key={key} onPress={() => navigation.navigate('CBDPage', { plan_name: key })}>
                    <View className="px-4 py-4 m-4 bg-blue-200 flex-row justify-between items-center rounded-lg">
                        <Text className="text-xl font-bold my-2">{key}</Text>
                        <Text className="my-2">{plans[key].length} image(s)</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return rendered
    }

    return (
        <View className="flex-1 bg-gray-100 py-8" >
            <View className="py-8 px-8 bg-white rounded-lg">
                <Text className="text-2xl text-center font-bold my-2">Manage Plans</Text>
                <Text className="text-xs text-center">Select a plan and upload images or artists impressions to create your map scores</Text>
            </View>
            <View className="my-4">
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('ModalNewPlan')
                }}>
                    <View className="px-4 py-4 m-4 bg-white flex-row justify-between items-center rounded-lg">
                        <Text className="text-xl font-bold my-2">Create Plan</Text>
                        <FaIcon
                            name="plus"
                            color="#f66"
                            size={30}
                        ></FaIcon>
                    </View>
                </TouchableWithoutFeedback>

                {plans == null ? null : renderPlans()}
            </View>
            <Navbar />
        </View>
    )
}



export default function PlansPage() {
    return (
        <RootStack.Navigator
            initialRouteName="PlansScreen"
            screenOptions={{
                headerShown: false,
            }}>
            <RootStack.Group>
                <RootStack.Screen name="PlansScreen" component={PlansScreen} />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name="ModalNewPlan" component={ModalNewPlan} />
            </RootStack.Group>
        </RootStack.Navigator>
    );
}


// export default PlansPage