import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../components/navbar';
import axios from 'axios';

const UploadPage = ({ route, navigation }) => {
    const {plan_name} = route.params;

    const [pickedImagePath, setPickedImagePath] = useState('');

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
        }
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
        }
    }

    

    return (
        <View className="flex-1 bg-gray-100 py-8">
            <View className="py-8 px-8 bg-white rounded-lg">
                <Text className="text-2xl text-center font-bold my-2">Upload Image</Text>
                <Text className="text-xs text-center">Calculate score for a given street view</Text>
            </View>
            <View className="pt-12">
                {
                    pickedImagePath !== '' && <Image
                    source={{ uri: pickedImagePath }}
                    className="h-56 w-full self-center"
                    />
                }
                {
                    pickedImagePath == '' && <Image 
                    className="w-80 h-64 self-center" 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png' }} 
                    />
                }
            </View>
            {/* <Image className="pt-8 w-64 h-60 self-center" source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png'}} /> */}
            <View className="py-8 flex-row justify-around ">
                <View>
                    <TouchableOpacity onPress={openCamera}>
                        <Image className="w-20 h-20 rounded-full" source={{uri: 'https://thumbs.dreamstime.com/b/camera-icon-isolated-white-background-symbol-vector-185770595.jpg'}}/>
                    </TouchableOpacity>
                    
                    <Text className="py-2 self-center">Take Photo</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={showImagePicker}>
                        <Image className="w-20 h-20 rounded-full" source={{uri: 'https://previews.123rf.com/images/alfianiqbal/alfianiqbal2004/alfianiqbal200400232/145054184-picture-gallery-icon-logo-vector-illustrattion-photo-gallery-icon-design-vector-template-trendy-pict.jpg'}} />
                    </TouchableOpacity>
                    <Text className="py-2 self-center">Load Image</Text>
                </View>
            </View>
            <View className="px-12 py-4" >
                {
                    pickedImagePath !== '' && <TouchableOpacity 
                        className="rounded-3xl justify-center bg-red-500 active:bg-red-600" 
                        activeOpacity={1.0} 
                        onPress={() => {
                            navigation.navigate('PreviewPage', {
                                uri: pickedImagePath,
                                plan_name: plan_name,
                            });
                        }}
                    >
                        <Text className="py-4 text-center text-xl text-white">Select Image</Text>
                    </TouchableOpacity>
                }
            </View>
            <Navbar/>
        </View>
    )
}

export default UploadPage