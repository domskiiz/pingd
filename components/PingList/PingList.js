import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import AppBar from '../generic/AppBar';


export default class PingList extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });
    }

    render() {
        return (
            <View>
                <AppBar height={100}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />
                </AppBar>
                <Text>PingList</Text>
            </View>
        );
    }
}

PingList.propTypes = {
    navigator: PropTypes.object,
};

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        height: 64,
        marginTop: 20,
    },
});
