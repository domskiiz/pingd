import React, {Component} from 'react';
import {
    Image,
    Picker,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import Card from '../generic/Card';
import Theme from '../Theme';
import {getImageBorderColor, Types} from '../RelationshipTypes';


const CloseButton = (props) => (
    <TouchableOpacity style={styles.closeButtonWrapper} onPress={props.close}>
        <Image
            style={styles.closeButton}
            source={require('../../assets/close.png')}
        />
    </TouchableOpacity>
);

CloseButton.propTypes = {
    close: PropTypes.func.isRequired,
};


const RelationshipCombo = (props) => (
    <Picker style={styles.combo} selectedValue={props.priority}>
        <Picker.Item label={'Friend'} value={Types.Friend}/>
        <Picker.Item label={'Acquaintance'} value={Types.Acquaintance}/>
        <Picker.Item label={'Touchpoint'} value={Types.Touchpoint}/>
    </Picker>
);

RelationshipCombo.propTypes = {
    priority: PropTypes.number.isRequired,
};


const TopSection = (props) => {
    let name = `${props.firstName} ${props.lastName}`;
    let highlightStyle = {
        backgroundColor: getImageBorderColor(props.priority),
    };

    let contactImg = {uri: props.image};
    if (!props.image)
        contactImg = require('../../assets/contact.png');

    return (
        <View style={styles.topContainer}>
            <View style={styles.topMain}>
                <CloseButton close={props.reset}/>
                <Image
                    style={styles.image}
                    source={contactImg}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.name}>{name}</Text>
                    <Card style={styles.relationship}>
                        <Text style={styles.relationshipText}>
                            Friend
                        </Text>
                    </Card>
                </View>
            </View>
            <View style={[styles.topHighlight, highlightStyle]}/>
        </View>
    );
};

TopSection.propTypes = {
    image: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
};


export default class ContactView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopSection
                    image={this.props.contact.thumbnail}
                    firstName={this.props.contact.firstName}
                    lastName={this.props.contact.lastName}
                    priority={this.props.contact.priority}
                    reset={this.props.reset}
                />
            </View>
        );
    }
}

ContactView.propTypes = {
    contact: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    closeButtonWrapper: {
        position: 'absolute',
        top: 30,
        right: 10,
    },
    closeButton: {
        position: 'relative',
        resizeMode: 'contain',
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    topContainer: {
        shadowColor: Theme.DarkBlue,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
    },
    topMain: {
        height: 150,
        backgroundColor: Theme.Blue,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
    },
    topHighlight: {
        height: 6,
    },
    image: {
        resizeMode: 'contain',
        marginLeft: 16,
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 4,
        borderColor: Theme.White,
        backgroundColor: Theme.FadedBlueContact,
    },
    textWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 16,
    },
    nameWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 26,
        fontWeight: '600',
        color: Theme.White,
    },
    relationship: {
        marginTop: 8,
        backgroundColor: Theme.FadedGreen,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 3,
    },
    relationshipText: {
        fontSize: 20,
        fontWeight: '500',
        opacity: 0.9,
    },
});
