import React, {Component} from 'react';
import {
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
import Theme from './Theme';


const compareContacts = (c1, c2) => {
    if (c1.familyName < c2.familyName)
        return -1;
    else if (c1.familyName > c2.familyName)
        return 1;
    else {
        if (c1.givenName < c2.givenName)
            return -1;
        else if (c1.givenName > c2.givenName)
            return 1;
    }

    return 0;
};

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
        };

        this.getContacts = this.getContacts.bind(this);
    }

    getContacts = () => {
        Contacts.getAll((err, contacts) => {
            if (err)
                throw err;
            this.setState({ contacts: contacts.sort(compareContacts) });
        });
    };

    renderContactCard(contact) {
        return (
            <ContactCard
                firstName={contact.item.givenName}
                lastName={contact.item.familyName}
                phoneNumber={contact.item.phoneNumbers[0].number}
                emails={contact.item.emailAddresses}
            />
        )
    }

    componentWillMount() {
        this.getContacts();
    }

    render() {
        let contactList = null;
        if (this.state.contacts.length > 0)
            contactList = (
                <FlatList
                    data={this.state.contacts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderContactCard}
                />
            );

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    { contactList }
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Theme.White,
    },
});
