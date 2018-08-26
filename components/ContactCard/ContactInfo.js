import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


const ContactInfo = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image}></Image>
            <View style={styles.info}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.phone}>{props.phoneNumber}</Text>
            </View>
        </View>
    );
};

ContactInfo.propTypes = {
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
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
        fontWeight: '600',
        color: Theme.DarkBlue,
    },
    phone: {
        fontSize: 14,
        fontWeight: '300',
        color: Theme.DarkBlue,
    },
});

export default ContactInfo;
