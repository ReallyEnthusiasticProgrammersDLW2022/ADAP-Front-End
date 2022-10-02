import { View, Text, Image, TouchableWithoutFeedback, Touchable, Switch } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation()

    return (
        <View className="flex-row w-full h-20 bottom-0.5 items-center justify-evenly absolute py-4 bg-white rounded-lg">
            <TouchableWithoutFeedback onPress={() => navigation.navigate('HomePage')}>
                <View className="px-1">
                    <FaIcon
                        name="home"
                        color="#D3D3D3"
                        size={30}
                    ></FaIcon>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PlansPage')}>
                <View className="px-1">
                    <FaIcon
                        name="road"
                        color="#D3D3D3"
                        size={30}
                    ></FaIcon>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PricingPage')}>
                <View className="px-1">
                    <FaIcon
                        name="credit-card"
                        color="#D3D3D3"
                        size={30}
                    ></FaIcon>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AboutPage')}>
                <View className="px-1">
                    <FaIcon
                        name="info"
                        color="#D3D3D3"
                        size={30}
                    ></FaIcon>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Navbar