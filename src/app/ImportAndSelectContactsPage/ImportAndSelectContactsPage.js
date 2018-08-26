import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import Contacts from 'react-native-contacts';

import ContactCard from '../generic/ContactCard/ContactCard';

import {connect} from 'react-redux';
import {screensOperations} from '../Screens/ducks';

class ImportAndSelectContactsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          contacts: [],
        };
    }

    _getContacts = () => {
        Contacts.getAll((err, c) => {
            if (err) {
                throw err;
            }
            this.setState({contacts: c});
        });
    };

    _startMainApp = () => {
        this.props.startMainApp();
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title={'Get Contacts'}
                        onPress={() => this._getContacts()}
                />
                    {
                      this.state.contacts.length !== 0
                      ? <FlatList
                          data={this.state.contacts}
                          renderItem={(c) =>
                              <ContactCard
                                  firstName={c.item.givenName}
                                  lastName={c.item.familyName}
                                  phoneNumber={c.item.phoneNumbers[0].number}
                                  emails={c.item.emailAddresses}
                              />
                          }
                        />
                      : null
                    }
                <Button title={'Done Importing'}
                        onPress={() => this._startMainApp()}
                />
            </View>
        );
    }
}

ImportAndSelectContactsPage.propTypes = {
    startMainApp: PropTypes.function,
};

const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startMainApp: () => dispatch(screensOperations.contactsDoneImporting()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportAndSelectContactsPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7',
        margin: 10,
    },
});
