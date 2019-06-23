import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Image, Dimensions, FlatList, AppRegistry } from 'react-native';
import Post from '../AppBarberHome/src/components/Post';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      fotos: []
    }
  }


  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }));
  }

  render() {
    return (
      <FlatList style={styles.container}

        data={this.state.fotos}
        keyExtractor={(this.state.fotos.id)}
        renderItem={({ item }) =>
          <Post foto={item} />

        }
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgProfile: {
    margin: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },

  img: {
    width: width,
    height: width
  },
})


