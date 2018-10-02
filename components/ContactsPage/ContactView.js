import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ContactOption from './ContactOption';
import ContactViewTop from './ContactViewTop';
import PriorityPicker from './PriorityPicker';
import Theme from '../Theme';

import setContactPriority from '../../api/redux/actions/setContactPriority';


class ContactView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priorityPicker: false,
        };

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
                        <ContactOption option="I will" selected="contact"/>
                        <ContactOption last
                            option={`${contact.firstName} every`}
                            selected="2 weeks"
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
});

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setContactPriority: (cid, p) => dispatch(setContactPriority(cid, p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
