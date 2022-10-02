import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';


export default function App({}) {    //** pass in newData [{id, coord, location, bike_score, walk_score}] 
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      location = location.coords.latitude + ',' + location.coords.longitude
      setLocation(location);
      console.log(location)
      
    })();
  }, []);

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

  return (
    
    <View style={styles.container}>
      <Text>{}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});