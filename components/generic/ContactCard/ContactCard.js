import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import addContact from '../../../api/redux/actions/addContact';
import {connect} from 'react-redux';


class ContactCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false,
        };
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        this.setState({flipped: !this.state.flipped});
    }

    _setPriority(priority) {
        const contact = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            phone: this.props.phoneNumber,
        };
        this.props.addContact(contact, priority);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onClick}>
                {
                    this.state.flipped
                    ?
                        <View style={styles.container}>
                            <Button
                                onPress={() => this._setPriority(1)}
                                title="1"
                                color="#2980b9"
                            />
                            <Button
                                onPress={() => this._setPriority(2)}
                                title="2"
                                color="#27ae60"
                            />
                            <Button
                                onPress={() => this._setPriority(3)}
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
