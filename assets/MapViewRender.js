import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const walkLowerThreshold= 96.53889958
const walkHigherThreshold= 97.37180887
const bikeLowerThreshold= 71.77875578
const bikeHigherThreshold= 74.69569372

//PASS IN NEW DATA 
const newData= [ 
  {id: 1, coord: "1.282525,103.845472", bike_score: 70, walk_score: 95},
  {id: 2, coord: "1.282625,103.846472", bike_score: 71, walk_score: 96},
  {id: 3, coord: "1.282725,103.847472", bike_score: 72, walk_score: 97},
  {id: 4, coord: "1.282825,103.848472", bike_score: 73, walk_score: 98},
  {id: 5, coord: "1.282925,103.849472", bike_score: 74, walk_score: 99}
]

function WalkOldScore({data}){
  if (data.walk <walkLowerThreshold){
    return (
      <Marker key={data.index} coordinate={{latitude: data.lat, longitude: data.lng}} image={require('./assets/Rcircle.png')}tracksViewChanges={false}/>);
  }else if (data.walk <walkHigherThreshold){
    return (
      <Marker key={data.index} coordinate={{latitude: data.lat, longitude: data.lng}} image={require('./assets/Ocircle.png')} tracksViewChanges={false}/>);
  }else{
    return (
      <Marker key={data.index} coordinate={{latitude: data.lat, longitude: data.lng}} image={require('./assets/Ycircle.png')} onPress={() => console.log("pressed")} tracksViewChanges={false}/>);
  } 
}

function WalkNewScore({data}){
  [lat, lng]= data.coord.split(",")
  if (data.walk_score <walkLowerThreshold){
    return (
      <Marker key={data.id} coordinate={{latitude: Number(lat), longitude: Number(lng)}} image={require('./assets/Rlocation.png')} onPress={() => console.log("pressed")}/>);
  }else if (data.walk_score <walkHigherThreshold){
    return (
      <Marker key={data.id} coordinate={{latitude: Number(lat), longitude: Number(lng)}} image={require('./assets/Olocation.png')} onPress={() => console.log("pressed")}/>);
  }else{
    return (
      <Marker key={data.id} coordinate={{latitude: Number(lat), longitude: Number(lng)}} image={require('./assets/Ylocation.png')} onPress={() => console.log("pressed")}/>);
  } 
}

function BikeOldScore({data}){
  if (data.bike <bikeLowerThreshold){
    return (
      <Marker key={data.index} coordinate={{latitude: data.lat, longitude: data.lng}} image={require('./assets/Rcircle.png')} tracksViewChanges={false}/>);
  }else if (data.bike <bikeHigherThreshold){
    return (
      <Marker key={data.index} coordinate={{latitude: data.lat, longitude: data.lng}} image={require('./assets/Ocircle.png')} tracksViewChanges={false}/>);
  }else{
    return (
      <Marker key={data.index} coordinate={{latitude: data.lat, longitude: data.lng}} image={require('./assets/Ycircle.png')}  tracksViewChanges={false}/>);
  } 
}

function BikeNewScore({data}){
  [lat, lng]= data.coord.split(",")
  if (data.bike_score <bikeLowerThreshold){
    return (
      <Marker key={data.index} coordinate={{latitude: Number(lat), longitude: Number(lng)}} image={require('./assets/Rlocation.png')} onPress={() => console.log("pressed")}/>);
  }else if (data.bike_score <bikeHigherThreshold){
    return (
      <Marker key={data.index} coordinate={{latitude: Number(lat), longitude: Number(lng)}} image={require('./assets/Olocation.png')} onPress={() => console.log("pressed")}/>);
  }else{
    return (
      <Marker key={data.index} coordinate={{latitude: Number(lat), longitude: Number(lng)}} image={require('./assets/Ylocation.png')} onPress={() => console.log("pressed")}/>);
  } 
}


export default function App({}) {    //** pass in newData [{id, coord, location, bike_score, walk_score}] 
  const originalWalk= require('./assets/final_walk.json')
  const originalBike= require('./assets/final_bike.json')

  return (
    <View style={styles.container}>
      <MapView style={styles.map} userInterfaceStyle={'dark'} mapType={"mutedStandard"} maxZoomLevel={20} minZoomLevel={10}scrollEnabled={true} scrollDuringRotateOrZoomEnabled= {true} loadingEnabled={true} initialRegion={styles.region} rotateEnabled= {false}mapPadding={styles.EdgePadding}>
        
        {/* <Marker title= {"point 1"} coordinate={{latitude: 1.2868,longitude: 103.8545 }} icon={require('./assets/sMarker.png') }></Marker>
          <Image source={require('./assets/adaptive-icon.png')} style={{height: 35, width:35 }} /> */}
        {originalWalk.map(marker => {
            return <WalkOldScore data={marker} key={marker.index}/>
        })}
        {newData.map(marker => {
              return <WalkNewScore data={marker} key={marker.id}/>
        })}
      </MapView>

      <MapView style={styles.map} userInterfaceStyle={'dark'} mapType={"mutedStandard"} maxZoomLevel={20} minZoomLevel={10}scrollEnabled={true} scrollDuringRotateOrZoomEnabled= {true} loadingEnabled={true} initialRegion={styles.region} rotateEnabled= {false}mapPadding={styles.EdgePadding}>
      {originalBike.map(marker => {
          return <BikeOldScore data={marker} key={(marker.index)}/>
      })}
      {newData.map(marker => {
            return <BikeNewScore data={marker} key={marker.id}/>
      })}
      </MapView>

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
  map: {
    width: 700,
    height: 300
  },
  region: { //TELOK AYER mrt coordinates
    latitude: 1.282125,
    longitude: 103.848472,
    latitudeDelta: 0.010,
    longitudeDelta: 0.008,
  },
  EdgePadding: {
    top: 50,
    right: 30,
    bottom: 50,
    left: 30
  }
});