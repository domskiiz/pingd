import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Swiper from 'react-native-swiper';
import Theme from '../Theme';

import {connect} from 'react-redux';
import * as appActions from '../../api/redux/actions/appActions/changeRoot';

class Onboarding extends Component {
    constructor(props) {
        super(props);
        this._startApp = this._startApp.bind(this);
    }

    _startApp = () => {
        this.props.startAppImporting();
    }

    render() {
        return (
            <Swiper>
                <View style={styles.slide1}>
                  <View></View>
                  <View><Text>Social Relations are like flowers</Text></View>
                </View>
                <View style={styles.slide2}>
                  <View></View>
                  <View><Text>Our lives are busy</Text></View>
                </View>
                <View style={styles.slide1}>
                    <View></View>
                    <View><Text>Pingd helps you text/call your friends</Text></View>
                </View>
                <View style={styles.slide3}>
                    <Text>The secret to a meaningful life is a beautiful social garden of strong,
                    high quality relationships</Text>
                    <Button
                        title="Let's Get Started"
                        onPress={this._startApp}
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
