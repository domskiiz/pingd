import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';


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
                <Text>PingList</Text>
            </View>
        );
    }
}

PingList.propTypes = {
    navigator: PropTypes.object,
};
