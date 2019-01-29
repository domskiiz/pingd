/*
 * FacebookService.js
 */

import React from 'react';
import {View} from 'react-native';
import {GraphRequest, GraphRequestManager, LoginButton} from 'react-native-fbsdk';

class FacebookService {
    constructor() {
        this.accessToken = null;
        this.userID = null;
        this.requestManager = new GraphRequestManager();
    }

    profileLoaded() {
        return this.accessToken && this.userID;
    }


    renderLoginButton(callback) {
        return (
            <View>
                <LoginButton
                    readPermissions={['public_profile']}
                    onLoginFinished={callback}
                />
            </View>
        );
    }

    async getProfile() {
        return new Promise((resolve, reject) => {
            const request = new GraphRequest('/me', null, (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });

            this.requestManager.addRequest(request).start();
        });
    }
}

export const FBService = new FacebookService();
