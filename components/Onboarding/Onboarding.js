import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Swiper from 'react-native-swiper';

import {connect} from 'react-redux';
import * as appActions from '../../api/redux/actions/appActions/changeRoot';

class Onboarding extends Component {
    constructor(props) {
        super(props);
    }

    _startApp = () => {
        this.props.startAppImporting();
    }

    render() {
        return (
            <Swiper>
                <View style={styles.slide1}>
                    <Text>Some onboarding text here</Text>
                </View>
                <View style={styles.slide2}>
                    <Text>More text here</Text>
                </View>
                <View style={styles.slide3}>
                    <Text>Yay! lets import your contacts</Text>
                    <Button
                        title="Get started"
                        onPress={() => this._startApp()}
                    />
                </View>
            </Swiper>
        );
    }
}



Onboarding.propTypes = {
    startAppImporting: PropTypes.func,
};


const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAppImporting: () => dispatch(appActions.login()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);


const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
});
