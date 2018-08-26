import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Card from '../generic/Card';
import Theme from '../Theme';


const FRIEND       = 0;
const ACQUAINTANCE = 1;
const TOUCHPOINT   = 2;


const Selector = (props) => {
    let text = '';
    let bgColor = '';

    if (props.friend) {
        bgColor = props.selected ? Theme.Green : Theme.FadedGreen;
        text = 'Friend';
    } else if (props.acquaintance) {
        bgColor = props.selected ? Theme.Blue : Theme.FadedBlue;
        text = 'Acquaintance';
    } else if (props.touchpoint) {
        bgColor = props.selected ? Theme.Purple : Theme.FadedPurple;
        text = 'Touchpoint';
    }

    return (
        <TouchableOpacity style={{flex: 1}} onPress={props.setPriority}>
            <View style={[styles.selector, {backgroundColor: bgColor}]}>
                <Text style={styles.selectorText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

Selector.propTypes = {
    selected: PropTypes.bool.isRequired,
    friend: PropTypes.bool,
    acquaintance: PropTypes.bool,
    touchpoint: PropTypes.bool,
    setPriority: PropTypes.func.isRequired,
};


class BucketSelector extends Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    select(priority) {
        this.setState({selected: priority});
        this.props.setPriority(priority);
        this.props.flip();
    }

    render() {
        let priority = this.props.priority;
        return (
            <Card style={[styles.container, this.props.style]}>
                <Selector friend
                    selected={priority < 0 || priority === FRIEND}
                    setPriority={() => this.select(FRIEND)}
                />
                <Selector acquaintance
                    selected={priority < 0 || priority === ACQUAINTANCE}
                    setPriority={() => this.select(ACQUAINTANCE)}
                />
                <Selector touchpoint
                    selected={priority < 0 || priority === TOUCHPOINT}
                    setPriority={() => this.select(TOUCHPOINT)}
                />
            </Card>
        );
    }
}

BucketSelector.propTypes = {
    priority: PropTypes.number.isRequired,
    flip: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
    style: PropTypes.array,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    selector: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    selectorText: {
        fontSize: 12,
        color: Theme.White,
        marginBottom: 5,
    },
});

export default BucketSelector;