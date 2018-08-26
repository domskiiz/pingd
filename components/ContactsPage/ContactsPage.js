import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ContactCard from '../generic/ContactCard';
import Theme from '../Theme';


class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });
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
    navigator: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.White,
        margin: 10,
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
