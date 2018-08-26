import React from 'react';
import {
    View,
} from 'react-native';
import PropTypes from 'prop-types';


const ContactView = () => {
    return (
        <View/>
    );
};

ContactView.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactView;
