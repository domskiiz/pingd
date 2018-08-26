import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import addContact from '../../api/redux/actions/addContact';
import {connect} from 'react-redux';

import BucketSelector from './BucketSelector';
import ContactInfo from './ContactInfo';
import Theme from '../Theme';


class ContactCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false,
        };

        this._onClick = this._onClick.bind(this);
        this._setPriority = this._setPriority.bind(this);
    }

    _onClick() {
        this.setState({flipped: !this.state.flipped});
    }

    _setPriority(priority) {
        const contact = {
            name: this.props.firstName + ' ' + this.props.lastName,
            phone: this.props.phoneNumber,
        };
        this.props.addContact(contact, priority);
    }

    // TODO: this might not even be needed, but the default phone numbers
    // TODO: returned by react-native-contacts are in a weird-ass format
    formatPhoneNumber(phoneNumber) {
        let digits = '';
        for (let i = 0; i < phoneNumber.length; i++) {
            let ch = phoneNumber[i];
            if (ch >= '0' && ch <= '9')
                digits += ch;
        }

        // TODO: this is janky, won't work for longer country codes
        if (digits.length === 11) {
            let countryCode = digits[0];
            let areaCode = digits.slice(1, 4);
            let number = `${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
            return `+${countryCode} (${areaCode}) ${number}`;
        } else if (digits.length === 10) {
            let areaCode = digits.slice(0, 3);
            let number = `${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
            return `(${areaCode}) ${number}`;
        } else if (digits.length === 7) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
        } else {
            return digits;
        }
    }

    render() {
        let name = `${this.props.firstName} ${this.props.lastName}`;
        let phoneNumber = this.props.phoneNumber; // this.formatPhoneNumber(phoneNumber);

        let card = null;
        if (this.state.flipped)
            card = <BucketSelector setPriority={this._setPriority}/>;
        else
            card = (
                <ContactInfo
                    name={name}
                    phoneNumber={phoneNumber}
                    thumbnail={this.props.thumbnail}
                />
            );

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={null/* this._onClick */}
            >
                {card}
            </TouchableOpacity>
        );
    }
}

ContactCard.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    addContact: PropTypes.function,
};

const mapStateToProps = () => {
    return { };
};


const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (c, p) => dispatch(addContact(c, p)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 80,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Theme.LightBlue,
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
});
