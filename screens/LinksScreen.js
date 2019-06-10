import React from 'react';
import { ScrollView, StyleSheet, ListView, Text, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {

  ds = new ListView.DataSource({rowHasChanged: () => false}).cloneWithRows(['row 1', 'row 2']);

  render() {
    return (
      <ScrollView style={styles.container}>

        <ListView dataSource={this.ds}
        renderRow={
          (rowData) => <Button title={rowData} onPress={() => this.props.navigation.navigate('Home', {data: rowData})}
        />
        }/>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
