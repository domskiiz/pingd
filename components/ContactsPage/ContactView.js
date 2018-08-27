import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';
import {getImageBorderColor} from '../RelationshipTypes';


const TopSection = (props) => {
    let highlightStyle = {
        backgroundColor: getImageBorderColor(props.priority),
    };

    let contactImg = {uri: props.image};
    if (!props.image)
        contactImg = require('../../assets/contact.png');

    return (
        <View style={styles.topContainer}>
            <View style={styles.topMain}>
                <Image
                    style={styles.image}
                    source={contactImg}
                />
            </View>
            <View style={[styles.topHighlight, highlightStyle]}/>
        </View>
    );
};

TopSection.propTypes = {
    image: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
};


const ContactView = (props) => {
    console.log('ContactView.render: contact:', props.contact);
    return (
        <View style={styles.container}>
            <TopSection
                image={props.contact.thumbnail}
                priority={props.contact.priority}
            />
        </View>
    );
};

ContactView.propTypes = {
    contact: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    topContainer: {
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
    topMain: {
        zIndex: 12,
        height: 108,
        backgroundColor: Theme.Blue,
    },
    topHighlight: {
        zIndex: 10,
        height: 6,
    },
    image: {
        resizeMode: 'contain',
        marginLeft: 24,
        marginTop: 40,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: Theme.White,
        backgroundColor: Theme.FadedBlueContact,
    },
});

export default ContactView;
