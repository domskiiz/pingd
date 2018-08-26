import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';


const ContactInfo = (props) => {
    return (
        <View style={styles.container}>
            <Image></Image>
            <View>
                <Text>{props.name}</Text>
                <Text>{props.phoneNumber}</Text>
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
        backgroundColor: '#bdc3c7',
        margin: 10,
    },
});

export default ContactInfo;
