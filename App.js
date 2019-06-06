import React from "react";
import MapView, { Polyline } from 'react-native-maps';
import DatastoreAPI from './datastoreAPI'
import { Button } from 'react-native';


const APIKEY = 'AIzaSyCO0Nc1bNzKeqTzjcRVczqR53F7KUe7oDM'

const _XHR = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest

export default class App extends React.Component {

  XMLHttpRequest = _XHR

  constructor(props) {
    super(props)
    this.fetchMarkerData = this.fetchMarkerData.bind(this);

    this.state = {
      isLoading: true,
      markers: []
    }

  }

  componentDidMount() {
    this.fetchMarkerData()
  }

  decode(t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
    a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
    while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
    }
    return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } })
  }


  fetchMarkerData() {
    const data = new DatastoreAPI();
    let markers = []
    data.get({}, (...props) => {

      // console.log(props[1].data)

      const json = props[1].data.routePoints

      for (let i = 0; i < json.length - 1; i++) {

        const origin = json[i].lat + ',' + json[i].lng;

        const destination = json[i + 1].lat + ',' + json[i + 1].lng;

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

        fetch(url)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.routes.length) {

              markers = [...markers, ...(this.decode(responseJson.routes[0].overview_polyline.points))]

              this.setState({
                markers
              })
            }
          }).catch(e => { console.warn(e) });
      }

      const mode = 'driving';

    })
  }

  onPressLearnMore(){

    this.fetchMarkerData();

    // alert('aa')
  }
  render() {

    return (
      <React.Fragment>

        <MapView style={{ flex: 1 }} 
        region={{
          latitude: 32.759288351948356,
          longitude: -117.14747565600584,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>

          <Polyline
            coordinates={this.state.markers}
            strokeColor="#000"
            strokeColors={[
              '#7F0000',
              '#00000000', 
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={6}
          />

        </MapView>
        <Button
          onPress={this.fetchMarkerData}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </React.Fragment>
    )
  }
}