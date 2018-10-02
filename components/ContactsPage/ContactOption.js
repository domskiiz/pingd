import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


const ContactOption = (props) => (
    <View style={styles.outer}>
        <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.optionText}>{props.option}</Text>
                <Text style={styles.selectedText}>{props.selected}</Text>
            </View>
            <Image
                style={styles.chevron}
                source={require('../../assets/chevron-right.png')}
            />
        </TouchableOpacity>
        {props.last ? null : <View style={styles.border}/>}
    </View>
);

ContactOption.propTypes = {
    last: PropTypes.bool,
    option: PropTypes.string.isRequired,
    selected: PropTypes.string,
};

const styles = StyleSheet.create({
    outer: {
        width: '100%',
    },
    optionContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    border: {
        width: '90%',
        left: '5%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.Gray,
    },
    textContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
    },
    selectedText: {
        fontSize: 18,
        color: Theme.DarkGray,
    },
    chevron: {
        height: 20,
        width: 20,
        marginRight: 20,
    },
});

export default ContactOption;