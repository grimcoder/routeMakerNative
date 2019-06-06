import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";
import DatastoreAPI from './datastoreAPI'

const _XHR = GLOBAL.originalXMLHttpRequest ?  
GLOBAL.originalXMLHttpRequest :           
GLOBAL.XMLHttpRequest   

export default class App extends React.Component {

XMLHttpRequest = _XHR

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  fetchMarkerData() {
    const data = new DatastoreAPI();

    data.get({}, (...props)=>{
      console.log(props[1].data)
    })
  }

  render() {
    return (

      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 40.76727216,
          longitude: -73.99392888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        {/* 
        {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
          };

          const metadata = `Status: ${marker.statusValue}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.stationName}
              description={metadata}
            />
          );
        })} */}


      </MapView>

    );
  }
}