import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Button,
} from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements'
import ContactCard from '../generic/ContactCard/ContactCard';

import {connect} from 'react-redux';
// import * as appActions from '../../api/redux/actions/appActions/changeRoot';

function compareContacts(c1, c2) {
    if (c1.contact.lastName < c2.contact.lastName)
        return -1;
    else if (c1.contact.lastName > c2.contact.lastName)
        return 1;
    else {
        if (c1.contact.firstName < c2.contact.firstName)
            return -1;
        else if (c1.contact.firstName > c2.contact.firstName)
            return 1;
    }

    return 0;
}

class ContactsPage extends Component {
    constructor(props) {
        super(props);
        // this._startApp = this._startApp.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                  this.props.contacts
                  ?
                      <FlatList
                          data={this.props.contacts.sort(compareContacts)}
                          renderItem={(c) =>
                              <ContactCard
                                  firstName={c.item.contact.firstName}
                                  lastName={c.item.contact.lastName}
                                  phoneNumber={c.item.contact.phone}
                              />
                          }
                      />
                  : null
                }
                <Button
                onPress={() => console.log('Add New Contacts')}
                title="Add Contacts"
                color="royalblue"
                accessibilityLabel="Click to import new contacts"
              />
            </View>
        );
    }
}

ContactsPage.propTypes = {
    contacts: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

const mapDispatchToProps = () => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7',
        margin: 10,
    },
});
