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


class ContactView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picker: false,
            selected: this.props.contact.priority,
        };

        this._togglePicker = this._togglePicker.bind(this);
        this._updateSelection = this._updateSelection.bind(this);
    }

    _togglePicker() {
        this.setState({picker: !this.state.picker});
    }

    _updateSelection(value) {
        this.setState({selected: value});
        this._togglePicker();
    }

    _setContactPriority(priority) {
        this.props.setContactPriority(this.props.contact._id, priority);
        this._togglePicker();
    }

    render() {
        let contact = this.props.contact;
        let name = `${contact.firstName} ${contact.lastName}`;

        let picker = null;
        if (this.state.picker) {
            picker = (
                <Card style={styles.picker}>
                    <Text style={styles.pickerTitle}>Change relationship?</Text>
                    <TouchableOpacity
                        onPress={() => this._setContactPriority(Types.Friend)}
                    >
                        <View style={[styles.pickerSelect, styles.pickerFriend]}>
                            <Text style={styles.pickerText}>Friend</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._setContactPriority(Types.Acquaintance)}
                    >
                        <View style={[styles.pickerSelect, styles.pickerAcq]}>
                            <Text style={styles.pickerText}>Acquaintance</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._setContactPriority(Types.Touchpoint)}
                    >
                        <View style={[styles.pickerSelect, styles.pickerTpoint]}>
                            <Text style={styles.pickerText}>Touchpoint</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._togglePicker}>
                        <View style={[styles.pickerSelect, styles.pickerCancel]}>
                            <Text style={styles.pickerText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </Card>
            );
        }

        return (
            <View style={styles.container}>
                <ContactViewTop
                    image={contact.thumbnail}
                    name={name}
                    picker={this._togglePicker}
                    priority={contact.priority}
                    reset={this.props.reset}
                />
                {picker}
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
    picker: {
        width: '70%',
        position: 'relative',
        top: 40,
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
