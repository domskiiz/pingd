import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';
import Theme from '../Theme';


const ContactCard = (props) => {
    let contactImg = {uri: props.thumbnail};
    if (!props.thumbnail)
        contactImg = require('../../assets/pingd_contact.png');

    return (
        <Card style={[styles.container, props.style]}>
            <Image
                source={contactImg}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.phone}>{props.phoneNumber}</Text>
            </View>
        </Card>
    );
};

ContactCard.propTypes = {
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    style: PropTypes.array,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: 58,
        height: 58,
        borderRadius: 29,
        margin: 20,
        backgroundColor: Theme.Blue,
    },
    info: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 22,
        fontWeight: '500',
        color: Theme.DarkBlue,
    },
    phone: {
        fontSize: 14,
        fontWeight: '300',
        color: Theme.DarkBlue,
    },
});

export default ContactCard;
