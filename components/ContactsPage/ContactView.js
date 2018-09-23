import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Card from '../generic/Card';
import ContactViewTop from './ContactViewTop';
import Theme from '../Theme';
import {Types} from '../RelationshipTypes';

import setContactPriority from '../../api/redux/actions/setContactPriority';


const Picker = (props) => (
    <Card style={styles.picker}>
        <Text style={styles.pickerTitle}>Change relationship?</Text>
        <TouchableOpacity
            onPress={() => props.updatePriority(Types.Friend)}
        >
            <View style={[styles.pickerSelect, styles.pickerFriend]}>
                <Text style={styles.pickerText}>Friend</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => props.updatePriority(Types.Acquaintance)}
        >
            <View style={[styles.pickerSelect, styles.pickerAcq]}>
                <Text style={styles.pickerText}>Acquaintance</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => props.updatePriority(Types.Touchpoint)}
        >
            <View style={[styles.pickerSelect, styles.pickerTpoint]}>
                <Text style={styles.pickerText}>Touchpoint</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toggle}>
            <View style={[styles.pickerSelect, styles.pickerCancel]}>
                <Text style={styles.pickerText}>Cancel</Text>
            </View>
        </TouchableOpacity>
    </Card>
);

Picker.propTypes = {
    toggle: PropTypes.func.isRequired,
    updatePriority: PropTypes.func.isRequired,
};


class ContactView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picker: false,
            selected: this.props.contact.priority,
        };

        this._togglePicker = this._togglePicker.bind(this);
        this._setContactPriority = this._setContactPriority.bind(this);
    }

    _togglePicker() {
        this.setState({picker: !this.state.picker});
    }

    _setContactPriority(priority) {
        this.props.setContactPriority(this.props.contact._id, priority);
        this._togglePicker();
    }

    render() {
        let contact = this.props.contact;
        let name = `${contact.firstName} ${contact.lastName}`;

        let picker = (
            <Picker
                toggle={this._togglePicker}
                updatePriority={this._setContactPriority}
            />
        );

        return (
            <View style={styles.container}>
                <ContactViewTop
                    image={contact.thumbnail}
                    name={name}
                    picker={this._togglePicker}
                    priority={contact.priority}
                    reset={this.props.reset}
                />
                {this.state.picker ? picker : null}
                <View style={styles.textContainer}>
                    <Text style={styles.contactText}>
                        {'I will contact ' + contact.firstName + ' every 2 weeks'}
                    </Text>
                    <Text style={styles.lastPOC}>
                        Last point of contact:
                    </Text>
                    <View style={styles.inset}/>
                </View>
            </View>
        );
    }
}

ContactView.propTypes = {
    contact: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    // Redux actions
    setContactPriority: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 20,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    picker: {
        position: 'absolute',
        zIndex: 21,
        width: '70%',
        top: 200,
        left: '15%',
        borderRadius: 3,
    },
    pickerTitle: {
        fontSize: 20,
        fontWeight: '500',
        width: '100%',
        textAlign: 'center',
        margin: 0,
        paddingTop: 20,
        paddingBottom: 20,
        color: Theme.DarkBlue,
    },
    pickerSelect: {
        width: '100%',
        margin: 0,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerFriend: {
        backgroundColor: Theme.Green,
    },
    pickerAcq: {
        backgroundColor: Theme.Blue,
    },
    pickerTpoint: {
        backgroundColor: Theme.Purple,
    },
    pickerCancel: {
        backgroundColor: '#66666650',
    },
    pickerText: {
        fontSize: 16,
        fontWeight: '500',
        color: Theme.White,
        margin: 0,
    },
    textContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Theme.White,
    },
    contactText: {
        fontSize: 16,
    },
    lastPOC: {
        fontSize: 14,
    },
    inset: {
        width: 80,
        height: 40,
        backgroundColor: Theme.FadedBlue,
    },
});

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setContactPriority: (cid, p) => dispatch(setContactPriority(cid, p)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
