import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
} from 'react-native';
import PropTypes from 'prop-types';

import {addContact} from '../../api/redux/actions/addContact';
import {store} from '../../api/redux/store';


export default class ContactCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false,
        };
        this._onClick = this._onClick.bind(this);
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
        return (
            <View style={styles.container} onClick={this._onClick}>
                {
                    this.state.flipped
                    ?
                        <View style={styles.container}>
                            <Button
                                onClick={() => this._setPriority(1)}
                                title="1"
                                color="#2980b9"
                            />
                            <Button
                                onClick={() => this._setPriority(2)}
                                title="2"
                                color="#27ae60"
                            />
                            <Button
                                onClick={() => this._setPriority(3)}
                                title="3"
                                color="#16a085"
                            />
                        </View>
                    :
                        <View style={styles.container}>
                            <Image></Image>
                            <View>
                                <Text>
                                    {this.props.firstName + ' '
                                    + this.props.lastName}
                                </Text>
                                <Text>{this.props.phoneNumber}</Text>
                            </View>
                        </View>
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
