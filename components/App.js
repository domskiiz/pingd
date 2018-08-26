import React, {Component} from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import contacts from '../api/redux/reducers/root';
import logger from 'redux-logger';

const store = createStore(contacts, applyMiddleware(logger));

import Contacts from 'react-native-contacts';
import ContactCard from './ContactCard/ContactCard';
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


const AppBar = () => (
    <View style={styles.appBar}>
        <View style={styles.appBarMain}>
            <Text style={styles.appBarText}>Select your contacts</Text>
        </View>
        <View style={styles.appBarHighlight}/>
    </View>
);


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
        };

        this.getContacts = this.getContacts.bind(this);
        this.renderContactCard = this.renderContactCard.bind(this);
    }

    getContacts = () => {
        Contacts.getAll((err, contacts) => {
            if (err)
                throw err;
            this.setState({ contacts: contacts.sort(compareContacts) });
        });
    };

    getContactSeparator(letter) {
        return (
            <View style={styles.contactSep}>
                <View style={styles.contactSepLine}/>
                <View style={styles.contactSepTextWrapper}>
                    <Text style={styles.contactSepText}>
                        {letter}
                    </Text>
                </View>
            </View>
        );
    }

    renderContactCard(contact) {
        if (contact.item.isSeparator) 
            return this.getContactSeparator(contact.item.letter);

        return (
            <ContactCard
                firstName={contact.item.givenName}
                lastName={contact.item.familyName}
                phoneNumber={contact.item.phoneNumbers[0].number}
                emails={contact.item.emailAddresses}
            />
        )
    }

    addContactSeparators(contacts) {
        let processed = [];
        let lastInitial = null;

        for (let i = 0; i < contacts.length; i++) {
            let initial = contacts[i].familyName[0];
            if (initial != lastInitial) {
                processed.push({ isSeparator: true, letter: initial });
                lastInitial = initial;
            }

            processed.push(contacts[i]);
        }

        return processed;
    }

    componentWillMount() {
        this.getContacts();
    }

    render() {
        let contactList = null;
        if (this.state.contacts.length > 0)
            contactList = (
                <FlatList
                    contentContainerStyle={styles.contactList}
                    data={this.addContactSeparators(this.state.contacts)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderContactCard}
                />
            );

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <AppBar/>
                    { contactList }
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    appBar: {
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
    appBarMain: {
        height: 80,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Theme.Blue,
    },
    appBarHighlight: {
        height: 4,
        backgroundColor: Theme.DarkBlue,
    },
    appBarText: {
        fontSize: 20,
        fontWeight: '600',
        color: Theme.White,
        marginBottom: 18,
    },
    container: {
        flex: 1,
        backgroundColor: Theme.White,
    },
    contactList: {
        padding: 20,
    },
    contactSep: {
        height: 24,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contactSepTextWrapper: {
        position: 'absolute',
        left: 20,
        width: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.White,
    },
    contactSepText: {
        fontSize: 18,
        fontWeight: '600',
        color: Theme.DarkBlue,
        textTransform: 'uppercase',
    },
    contactSepLine: {
        borderBottomColor: `${Theme.DarkBlue}50`,
        borderBottomWidth: 1,     
    },
});
