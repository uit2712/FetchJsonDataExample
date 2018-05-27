/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import data from './json/FetchJsonDataExample.json';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // check if json data (online) is fetching
      dataSource: [], // store an object of json data
    };
  }

  componentDidMount() {
    return fetch("https://gist.githubusercontent.com/uit2712/c3961e1377c4cfcc7adf6b9c72e2e51b/raw/b928dcd33a5b295a0286b42eae9436624e3e37fd/FetchJsonDataExample.json")
          .then((response) => response.json())
          .then((responseJson) => {
            // set state value
            this.setState({
              isLoading: false, // already loading
              dataSource: responseJson.info
            });
          })
          .catch((error) => {
            ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
          });
  }

  render() {
    // show waiting screen when json data is fetching
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => {
            return (
              <View>
                <Text style={styles.info}>{item.name} is {item.age} years old. {item.sex == "male" ? "He" : "She"} likes {item.hobby}</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    fontSize: 20,
  }
});
