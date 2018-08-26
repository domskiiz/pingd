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

    render() {
        let name = `${this.props.firstName} ${this.props.lastName}`;
        // TODO: put in a consistent format
        let phoneNumber = this.props.phoneNumber;

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
