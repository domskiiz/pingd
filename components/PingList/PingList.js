import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ListItem,
} from 'react-native';
import PropTypes from 'prop-types';

import ContactCard from '../generic/ContactCard/ContactCard';
import PingCard from '../generic/ContactCard/PingCard';

import Theme from '../Theme';

import {connect} from 'react-redux';

class PingList extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        var pingContacts = [].concat(this.props.contacts);
        pingContacts.sort((a,b) => a.daysUntil > b.daysUntil);

        return (
            <View style={styles.container}>
                <Text> Ping List </Text>
                {
                  pingContacts
                  ?
                      <FlatList
                          data={pingContacts}
                          renderItem={(c) =>
                            <PingCard
                                firstName={c.item.contact.firstName}
                                lastName={c.item.contact.lastName}
                                phone = {c.item.contact.phone}
                                priority={c.item.priority}
                                daysUntil={c.item.daysUntil}
                                index={c.index}
                            />
                          }
                      />
                  : null
                }
            </View>
        );
    }
}

PingList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PingList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7',
        margin: 10,
        flex: 1,
        paddingTop: 22
    },
    card:{
      borderColor: Theme.Green,
      borderWidth: 4,
      marginBottom: 10,
    },
    title: {
      padding: 10,
      paddingBottom: 0,
      fontSize: 18,
      height: 44,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      paddingTop: 2,
      paddingBottom: 10,
      fontSize: 9,
      height: 22,
      textAlign: 'center',
    },
});
