import { View, Text, TextInput, TouchableWithoutFeedback, Image, Button, TouchableOpacity, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import axios from 'axios';
import { setImgData } from '../data/readweb'
import { Buffer } from 'buffer'
import { async } from '@firebase/util';
import * as Location from 'expo-location';
import EnIcon from 'react-native-vector-icons/Entypo';



const PreviewPage = ({ route, navigation }) => {
    const { uri, plan_name } = route.params;
    const [id, setId] = useState(null);
    const [coord, setCoord] = useState('0,0');
    const [errorMsg, setErrorMsg] = useState(null);


    const onAutofillClick = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        location = location.coords.latitude + ',' + location.coords.longitude
        setCoord(location);
        console.log(location)
    }

    useEffect(() => {
        if (errorMsg != null) renderErrMsg(errorMsg)
    }, [errorMsg])

    const renderErrMsg = () => (
        Alert.alert(
            "Error",
            errorMsg,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    )

    useEffect(() => {
        if (!id) return
        navigation.navigate('ViewImagePage', { id })
    }, [id])

    const postImgForCalc = async () => {
        let localUri = uri;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('file', { uri: localUri, name: filename, type });
        formData.append('coordinates', coord);
        console.log("Top")
        let res = await axios.post('https://main-adap-back-end-really-enthusiastic-programmers-dlw2022.endpoint.ainize.ai/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        let { bikescore, walkscore, image } = res.data
        let base64String = Buffer.from(image, 'hex');
        let imageString = base64String.toString();

        let det = {
            bike_score: bikescore,
            walk_score: walkscore,
            coord,
            location: filename,
            location_seg: filename.split(".")[0] + "_seg.jpg",
            plan_name: plan_name,
        }

        setId(await setImgData(det, localUri, imageString, type))
    }

    return (
        <View className="flex-1 bg-gray-100 py-8">
            <View className="py-8 px-8 bg-white rounded-lg">
                <Text className="text-2xl text-center font-bold my-2">Preview</Text>
                <Text className="text-xs text-center">Uploaded Image</Text>
            </View>
            <View className="pt-12">
                <Image
                    source={{ uri: `${uri}` }}
                    className="w-full h-56 self-center"
                />
            </View>
            <View className="py-8 px-20 flex-col justify-around">
                <Text className="py-2 text-xl text-center font-bold">Coordinates:</Text>
                {/* <Text className="py-2 text-base self-center">{coord}</Text> */}
                <View className="flex-row justify-center">
                    <TextInput
                        className="w-44 h-12 py-2 px-4 self-center text-center rounded-2xl bg-white"
                        onChangeText={text => setCoord(text)}
                        returnKeyType="done"
                        multiline={true}
                        blurOnSubmit={true}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        clearTextOnFocus={true}
                        value={coord}
                    />
                    <TouchableOpacity className="ml-1 rounded-xl w-12 items-center justify-center bg-red-500 active:bg-red-600" activeOpacity={1.0} onPress={onAutofillClick}>
                        <EnIcon name="location" size={30} color="#D3D3D3" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="mt-8 rounded-3xl justify-center bg-red-500 active:bg-red-600" activeOpacity={1.0} onPress={postImgForCalc}>
                    <Text className="py-4 text-center text-xl text-white">Calculate Score</Text>
                </TouchableOpacity>
            </View>
            <Navbar />
        </View>
    )
}

export default PreviewPage