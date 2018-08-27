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
import {getBorderColor} from '../RelationshipTypes';


function getImageBorder(priority) {
    return {
        borderColor: getBorderColor(priority),
        borderWidth: 3,
    };
}


const ContactCard = (props) => {
    let contactImg = {uri: props.thumbnail};
    if (!props.thumbnail)
        contactImg = require('../../assets/contact.png');

    let imageStyle = [styles.image];
    if (props.priority >= 0)
        imageStyle.push(getImageBorder(props.priority));

    return (
        <Card style={[styles.container, props.style]}>
            <Image
                source={contactImg}
                style={imageStyle}
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
    priority: PropTypes.number,
    style: PropTypes.array,
    thumbnail: PropTypes.string.isRequired,
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
        backgroundColor: Theme.FadedBlueContact,
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
