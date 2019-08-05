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

class ContactsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                  this.props.contacts
                  ?
                      <FlatList
                          data={this.props.contacts}
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
                accessibilityLabel="Learn more about this purple button"
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
