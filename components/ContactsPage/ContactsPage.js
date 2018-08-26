import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ContactCard from '../generic/ContactCard';
import Theme from '../Theme';


class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });
    }

    render() {
        let contacts = this.props.contacts ? this.props.contacts : [];

        return (
            <View style={styles.container}>
                <FlatList
                    data={contacts}
                    renderItem={(c) =>
                        <ContactCard
                            firstName={c.item.contact.firstName}
                            lastName={c.item.contact.lastName}
                            phoneNumber={c.item.contact.phone}
                        />
                    }
                />
            </View>
        );
    }
}

ContactsPage.propTypes = {
    contacts: PropTypes.array.isRequired,
    navigator: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.White,
        margin: 10,
    },
});

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

const mapDispatchToProps = () => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
