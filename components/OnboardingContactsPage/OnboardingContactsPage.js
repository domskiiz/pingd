import React, {Component} from 'react';
import {
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as appActions from '../../api/redux/actions/appActions/changeRoot';

import ContactCard from '../generic/ContactCard/ContactCard';
import Theme from '../Theme';


const ContinueButton = () => (
    <TouchableOpacity style={styles.continueButtonWrapper}>
        <View style={styles.continueButton}>
            <Image
                style={styles.continueButtonImg}
                source={require('../assets/check.png')}
            />
        </View>
    </TouchableOpacity>
);


const AppBar = () => (
    <View style={styles.appBar}>
        <ContinueButton/>
        <View style={styles.appBarMain}>
            <Text style={styles.appBarText}>Select your contacts</Text>
        </View>
        <View style={styles.appBarHighlight}/>
    </View>
);


function compareContacts(c1, c2) {
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
}


class OnboardingContactsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
        };

        this._getContacts = this._getContacts.bind(this);
        this._renderContactCard = this._renderContactCard.bind(this);
    }

    _getContacts = () => {
        Contacts.getAll((err, contacts) => {
            if (err)
                throw err;
            this.setState({contacts: contacts.sort(compareContacts)});
        });
    };

    _getContactSeparator(letter) {
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

    _renderContactCard(contact) {
        if (contact.item.isSeparator)
            return this._getContactSeparator(contact.item.letter);

        return (
            <ContactCard
                firstName={contact.item.givenName}
                lastName={contact.item.familyName}
                phoneNumber={contact.item.phoneNumbers[0].number}
                thumbnail={contact.item.thumbnailPath}
            />
        );
    }

    _addContactSeparators(contacts) {
        let processed = [];
        let lastInitial = null;

        for (let i = 0; i < contacts.length; i++) {
            let initial = contacts[i].familyName[0];
            if (initial != lastInitial) {
                processed.push({isSeparator: true, letter: initial});
                lastInitial = initial;
            }

            processed.push(contacts[i]);
        }

        return processed;
    }

    _startMainApp = () => {
        this.props.startMainApp();
    }

    UNSAFE_componentWillMount() {
        this._getContacts();
    }

    render() {
        let contactList = null;
        if (this.state.contacts.length > 0)
            contactList = (
                <FlatList
                    contentContainerStyle={styles.contactList}
                    data={this._addContactSeparators(this.state.contacts)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderContactCard}
                />
            );

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <AppBar/>
                {contactList}
            </View>
        );
    }
}

OnboardingContactsPage.propTypes = {
    startMainApp: PropTypes.function,
};

const styles = StyleSheet.create({
    continueButtonWrapper: {
        position: 'absolute',
        zIndex: 12,
        right: 20,
        top: 52,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    continueButton: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: Theme.Blue,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: Theme.White,
        shadowColor: Theme.Black,
        shadowOpacity: 0.16,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
    continueButtonImg: {
        resizeMode: 'contain',
        width: 36,
        height: 36,
    },
    appBar: {
        zIndex: 10,
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


const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startMainApp: () => dispatch(appActions.contactsDoneImporting()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardingContactsPage);
