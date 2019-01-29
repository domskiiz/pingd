import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import {AccessToken} from 'react-native-fbsdk';

import AppBar from '../generic/AppBar';
import {FBService} from '../FacebookService';

export default class PingList extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false,
        });

        this.accessToken = null;
        this.userID = null;

        this.state = {
            profileLoaded: false,
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(error, result) {
        if (error) {
            // TODO
            alert('Login failed with error: ' + error.message);
        } else if (result.isCancelled) {
            // TODO
            alert('Login was cancelled');
        } else {
            AccessToken.getCurrentAccessToken().then((data) => {
                this.accessToken = data.accessToken;
                FBService.getProfile().then((profile) => {
                    this.userID = profile.id;
                    this.setState({profileLoaded: true});
                });
            });
        }
    }

    render() {
        if (this.state.profileLoaded) {
            const url = 'https://www.facebook.com/events/ical/birthdays/'
                + `?uid=${this.userID}&key=${this.userID}`;
            fetch(url)
                .then((response) => alert(JSON.stringify(response)))
                .catch((error) => alert('ERROR: ' + error));
        }

        return (
            <View>
                <AppBar height={100}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />
                </AppBar>
                {FBService.renderLoginButton(this.onLogin)}
            </View>
        );
    }
}

PingList.propTypes = {
    navigator: PropTypes.object,
};

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        height: 64,
        marginTop: 20,
    },
});
