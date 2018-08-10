import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text
} from 'react-native';
import Contacts from 'react-native-contacts';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };
  };

  getContacts = () => {
    Contacts.getAll((err, c) => {
      if (err) {
        throw err;
      }
      this.setState({contacts: c});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title={"Get Contacts"} onPress={() => this.getContacts()} />
        {
          this.state.contacts.length !== 0
          ? <FlatList
              data={this.state.contacts}
              renderItem={(contact) => <Text>{contact.item.givenName}</Text>}
            />
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
