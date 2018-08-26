import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import addContact from '../../api/redux/actions/addContact';
import {connect} from 'react-redux';

import BucketSelector from '../ContactCard/BucketSelector';
import ContactCard from '../generic/ContactCard';
import Theme from '../Theme';


class OnboardingContactCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false,
            priority: -1,
        };

        this.flip = this.flip.bind(this);
        this.setPriority = this.setPriority.bind(this);
    }

    flip() {
        this.setState({flipped: !this.state.flipped});
    }

    setPriority(priority) {
        if (priority == this.state.priority) {
            this.setState({priority: -1});
            return;
        }

        const contact = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            phone: this.props.phoneNumber,
        };
        this.props.addContact(contact, priority);
        this.setState({priority: priority});
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

    getBorderStyle() {
        let style = {
            borderColor: '',
            borderWidth: 4,
            shadowColor: '',
            shadowOpacity: 0.3,
        };

        if (this.state.priority >= 0)
            style.shadowOpacity = 0.8;

        if (this.state.priority === 0) {
            style.borderColor = Theme.Green;
            style.shadowColor = Theme.Green;
        } else if (this.state.priority === 1) {
            style.borderColor = Theme.Blue;
            style.shadowColor = Theme.Blue;
        } else if (this.state.priority === 2) {
            style.borderColor = Theme.Purple;
            style.shadowColor = Theme.Purple;
        }

        return style;
    }

    render() {
        let name = `${this.props.firstName} ${this.props.lastName}`;
        let phoneNumber = this.props.phoneNumber;  // TODO: format?

        let card = null;
        let cardStyle = [styles.card];
        if (this.state.flipped) {
            card = (
                <BucketSelector
                    style={cardStyle}
                    priority={this.state.priority}
                    flip={this.flip}
                    setPriority={this.setPriority}
                />
            );
        } else {
            if (this.state.priority >= 0)
                cardStyle.push(this.getBorderStyle());

            card = (
                <ContactCard
                    style={cardStyle}
                    name={name}
                    phoneNumber={phoneNumber}
                    thumbnail={this.props.thumbnail}
                />
            );
        }

        return (
            <TouchableOpacity style={styles.container} onPress={this.flip}>
                {card}
            </TouchableOpacity>
        );
    }
}

OnboardingContactCard.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    addContact: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        height: 80,
    },
});


const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (c, p) => dispatch(addContact(c, p)),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps)(OnboardingContactCard);
