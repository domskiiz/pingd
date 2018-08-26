import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ContactCard from '../generic/ContactCard';


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
