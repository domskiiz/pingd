import React from 'react';
import {
    Image,
    Picker,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Theme from '../Theme';


class ContactOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
        this._toggleExpand = this._toggleExpand.bind(this);
    }

    _toggleExpand() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        let picker = null;
        if (this.state.expanded) {
            let pickerItems = [];
            this.props.selections.forEach((opt, i) => {
                pickerItems.push(
                    <Picker.Item key={i} label={opt} value={opt}/>
                );
            });

            picker = (
                <View>
                    <View style={styles.border}/>
                    <Picker
                        style={styles.picker}
                        selectedValue="item2"
                    >
                        {pickerItems}
                    </Picker>
                </View>
            );
        }

        return (
            <View style={styles.outer}>
                <TouchableOpacity
                    style={styles.optionContainer}
                    onPress={this._toggleExpand}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.optionText}>
                            {this.props.option}
                        </Text>
                        <Text style={styles.selectedText}>
                            {this.props.selected}
                        </Text>
                    </View>
                    <Image
                        style={styles.chevron}
                        source={require('../../assets/chevron-right.png')}
                    />
                </TouchableOpacity>
                {picker}
                {this.props.last ? null : <View style={styles.border}/>}
            </View>
        );
    }
}

ContactOption.propTypes = {
    last: PropTypes.bool,
    option: PropTypes.string.isRequired,
    selections: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
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