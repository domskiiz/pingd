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

function comparePingCards(c1, c2) {
    if (c1.daysUntil < c2.daysUntil)
        return -1;
    else if (c1.daysUntil > c2.daysUntil)
        return 1;
    else if (c1.contact.lastName < c2.contact.lastName)
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

class PingList extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        // var pingContacts = [].concat(this.props.contacts);
        // pingContacts.sort((a,b) => a.daysUntil > b.daysUntil);

        return (
            <View style={styles.container}>
                <Text style={styles.title}> Ping List </Text>
                <Text style={styles.subtitle}>
                  Swipe Right if you Connected, Swipe Left to Snooze{"\n"}
                  Hold down card to text them Right Now!</Text>
                {
                  this.props.contacts
                  ?
                      <FlatList
                          data={this.props.contacts.sort(comparePingCards)}
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
    title:{
      marginBottom: 4,
      fontSize: 20,
      height: 22,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle:{
      paddingBottom: 10,
      fontSize: 8,
      textAlign: 'center',
    }
});
