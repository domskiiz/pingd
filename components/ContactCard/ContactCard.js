import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import addContact from '../../api/redux/actions/addContact';
import {connect} from 'react-redux';

import CardInfo from './CardInfo';


const FRIEND       = 0;
const ACQUAINTANCE = 1;
const TOUCHPOINT   = 2;


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
        return (
            <TouchableOpacity style={styles.container} onPress={this._onClick}>
                {
                    this.state.flipped
                    ?
                        <View style={styles.container}>
                            <Button
                                onClick={this._setPriority.bind(FRIEND)}
                                title="1"
                                color="#2980b9"
                            />
                            <Button
                                onClick={this._setPriority.bind(ACQUAINTANCE)}
                                title="2"
                                color="#27ae60"
                            />
                            <Button
                                onClick={this._setPriority.bind(TOUCHPOINT)}
                                title="3"
                                color="#16a085"
                            />
                        </View>
                    :
                        <CardInfo
                            name={name}
                            phoneNumber={this.props.phoneNumber}
                        />
                }

            </TouchableOpacity>
        );
    }
}

ContactCard.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
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
        backgroundColor: '#bdc3c7',
        margin: 10,
    },
});
