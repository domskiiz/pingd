import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import {addContact} from '../../api/redux/actions/addContact';
import {store} from '../../api/redux/store';

import CardInfo from './CardInfo';


const FRIEND       = 0;
const ACQUAINTANCE = 1;
const TOUCHPOINT   = 2;


export default class ContactCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false,
        };
        this._onClick = this._onClick.bind(this);
        this._setPriority = this._setPriority.bind(this);
    }

    _onClick() {
        console.log('here');
        this.setState({flipped: !this.state.flipped});
    }

    _setPriority = (priority) => {
        const contact = {
            name: this.props.firstName + ' ' + this.props.lastName,
            phone: this.props.phoneNumber,
        };
        store.dispatch(addContact(contact, priority));
    }

    render() {
        let name = `${this.props.firstName} ${this.props.lastName}`;
        return (
            <View style={styles.container} onClick={this._onClick}>
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

            </View>
        );
    }
}

ContactCard.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7',
        margin: 10,
    },
});
