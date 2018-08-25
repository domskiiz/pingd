import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    FlatList,
    Text,
} from 'react-native';
import Contacts from 'react-native-contacts';
// import detectFirstLaunch from "../utils/detectFirstLaunch";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          contacts: [],
        };
    }

    getContacts = () => {
        console.log(Contacts);
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
                <Button title={'Get Contacts'}
                        onPress={() => this.getContacts()}
                />
                    {
                      this.state.contacts.length !== 0
                      ? <FlatList
                          data={this.state.contacts}
                          renderItem={(c) => <Text>{c.item.givenName}</Text>}
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
});
