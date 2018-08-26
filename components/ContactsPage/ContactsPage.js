import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '../generic/AppBar';
import ContactCard from '../generic/ContactCard';
import ContactSeparator from '../generic/ContactSeparator';
import Theme from '../Theme';


function compareContacts(contact1, contact2) {
    let c1 = contact1.contact;
    let c2 = contact2.contact;

    if (c1.lastName < c2.lastName)
        return -1;
    else if (c1.lastName > c2.lastName)
        return 1;
    else {
        if (c1.firstName < c2.firstName)
            return -1;
        else if (c1.firstName > c2.firstName)
            return 1;
    }

    return 0;
}


class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });

        this._renderContactCard = this._renderContactCard.bind(this);
    }

    _addContactSeparators(contacts) {
        let processed = [];
        let lastInitial = null;

        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i].contact;
            let initial = contact.lastName[0];
            if (initial != lastInitial) {
                processed.push({isSeparator: true, letter: initial});
                lastInitial = initial;
            }

            processed.push(contact);
        }

        return processed;
    }

    _renderContactCard(contact) {
        if (contact.item.isSeparator)
            return <ContactSeparator letter={contact.item.letter}/>;
        let name = `${contact.item.firstName} ${contact.item.lastName}`;

        return (
            <TouchableOpacity style={styles.cardContainer}>
                <ContactCard
                    style={[styles.card]}
                    name={name}
                    phoneNumber={contact.item.phoneNumber}
                    thumbnail={contact.item.thumbnail}
                />
            </TouchableOpacity>
        );
    }

    render() {
        let contacts = this.props.contacts ? this.props.contacts : [];
        contacts.sort(compareContacts);

        return (
            <View style={styles.container}>
                <AppBar/>
                <FlatList
                    contentContainerStyle={styles.contactList}
                    data={this._addContactSeparators(contacts)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderContactCard}
                />
            </View>
        );
    }
}

ContactsPage.propTypes = {
    contacts: PropTypes.array.isRequired,
    navigator: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.White,
    },
    contactList: {
        padding: 20,
    },
    cardContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        height: 80,
    },
});

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

const mapDispatchToProps = () => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
