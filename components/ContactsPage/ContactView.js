import React, {Component} from 'react';
import {
    Picker,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ContactOption from './ContactOption';
import ContactViewTop from './ContactViewTop';
import PriorityPicker from './PriorityPicker';
import Theme from '../Theme';

import setContactPriority from '../../api/redux/actions/setContactPriority';


const contactPicker = () => (
    <View>
        <View style={styles.pickerBorder}/>
        <Picker selectedValue="item2">
            <Picker.Item label="item 1" value="item1"/>
            <Picker.Item label="item 2" value="item2"/>
            <Picker.Item label="item 3" value="item3"/>
        </Picker>
    </View>
);


const freqPicker = () => (
    <View>
        <View style={styles.pickerBorder}/>
        <View style={styles.pickerContainer}>
            <Picker style={styles.halfPicker} selectedValue="item2">
                <Picker.Item label="item 1" value="item1"/>
                <Picker.Item label="item 2" value="item2"/>
                <Picker.Item label="item 3" value="item3"/>
            </Picker>
            <Picker style={styles.halfPicker} selectedValue="weeks">
                <Picker.Item label="days" value="days"/>
                <Picker.Item label="weeks" value="weeks"/>
                <Picker.Item label="months" value="months"/>
                <Picker.Item label="years" value="years"/>
            </Picker>
        </View>
    </View>
);


class ContactView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priorityPicker: false,
            notes: '',
        };

        this._onNotesChange = this._onNotesChange.bind(this);
        this._setContactPriority = this._setContactPriority.bind(this);
        this._togglePriorityPicker = this._togglePriorityPicker.bind(this);
    }

    _togglePriorityPicker() {
        this.setState({priorityPicker: !this.state.priorityPicker});
    }

    _setContactPriority(priority) {
        this.props.setContactPriority(this.props.contact._id, priority);
        this._togglePicker();
    }

    _onNotesChange(text) {
        this.setState({notes: text});
    }

    _formatPOCDate(date) {
        if (date === 0)
            return 'N/A';

        let dateStr = '';

        let months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        dateStr += `${months[date.getMonth()]} `;

        let day = date.getDate();
        dateStr += day;
        if (day % 10 === 1 && day !== 11) dateStr += 'st';
        else if (day % 10 === 2 && day !== 12) dateStr += 'nd';
        else if (day % 10 === 3 && day !== 13) dateStr += 'rd';
        else dateStr += 'th';

        return dateStr;
    }

    render() {
        let contact = this.props.contact;
        let name = `${contact.firstName} ${contact.lastName}`;

        let priorityPicker = (
            <PriorityPicker
                toggle={this._togglePriorityPicker}
                updatePriority={this._setContactPriority}
            />
        );

        return (
            <View style={styles.container}>
                {this.state.priorityPicker ? priorityPicker : null}
                <ContactViewTop
                    image={contact.thumbnail}
                    name={name}
                    picker={this._togglePriorityPicker}
                    priority={contact.priority}
                    reset={this.props.reset}
                />
                <View style={styles.lowerContainer}>
                    <View style={styles.optionsContainer}>
                        <ContactOption
                            option="I will"
                            selected="contact"
                            picker={contactPicker}
                        />
                        <ContactOption last
                            option={`${contact.firstName} every`}
                            selected="2 weeks"
                            picker={freqPicker}
                        />
                    </View>
                    <View style={styles.LPOCContainer}>
                        <Text style={styles.LPOCText}>
                            last point of contact:
                        </Text>
                        <View style={styles.LPOCBox}>
                            <Text style={styles.LPOCInnerText}>
                                {this._formatPOCDate(contact.lastContact)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesTitle}>Notes:</Text>
                        <TextInput
                            style={styles.notes}
                            multiline={true}
                            onChangeText={this._onNotesChange}
                            value={this.state.notes}
                        />
                    </View>
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
    lowerContainer: {
        width: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Theme.DarkLightBlue,
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Theme.White,
    },
    pickerBorder: {
        width: '90%',
        left: '5%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.Gray,
    },
    pickerContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    halfPicker: {
        width: '50%',
    },
    LPOCContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    LPOCText: {
        fontSize: 18,
        fontWeight: '500',
        marginRight: 8,
    },
    LPOCBox: {
        backgroundColor: Theme.White,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginLeft: 8,
    },
    LPOCInnerText: {
        fontSize: 18,
        color: Theme.DarkGray,
    },
    notesContainer: {
        width: '100%',
        height: 250,
        padding: 24,
    },
    notes: {
        width: '100%',
        height: '100%',
        padding: 12,
        paddingTop: 12,
        backgroundColor: Theme.White,
        fontSize: 14,
    },
    notesTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: Theme.DarkGray,
        marginBottom: 10,
    },
});

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setContactPriority: (cid, p) => dispatch(setContactPriority(cid, p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
