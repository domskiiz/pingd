import React, {Component} from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    View,
} from 'react-native';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import contacts from '../api/redux/reducers/root';
import logger from 'redux-logger';

const store = createStore(contacts, applyMiddleware(logger));

import Contacts from 'react-native-contacts';
import ContactCard from './ContactCard/ContactCard';
// import detectFirstLaunch from '../utils/detectFirstLaunch';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
        };

        this.getContacts = this.getContacts.bind(this);
    }

    getContacts = () => {
        Contacts.getAll((err, c) => {
            if (err)
                throw err;
            this.setState({ contacts: c });
        });
    };

    render() {
        let contactList = null;
        if (this.state.contacts.length > 0)
            contactList = (
                <FlatList
                    data={this.state.contacts}
                    renderItem={c =>
                        <ContactCard
                            firstName={c.item.givenName}
                            lastName={c.item.familyName}
                            phoneNumber={c.item.phoneNumbers[0].number}
                            emails={c.item.emailAddresses}
                        />
                    }
                />
            );

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Button 
                        title={'Get Contacts'}
                        onPress={this.getContacts}
                    />
                    { contactList }
                </View>
            </Provider>
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
