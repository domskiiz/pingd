import React, {Component} from 'react'; // eslint-disable-line no-unused-vars

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../api/redux/reducers/root';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import * as appActions from '../api/redux/actions/appActions/changeRoot';

/*
 * Set up store and register screens with navigation
 */
const store = createStore(reducers, applyMiddleware(thunk, logger));
registerScreens(store, Provider);

export default class App extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());

    }

    onStoreUpdate() {
        let {root} = store.getState().app;
        if (this.currentRoot != root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    startApp(root) {
        switch (root) {
            case 'app': {
                Navigation.startTabBasedApp({
                    tabs: [
                        {
                            label: 'Contacts',
                            screen: 'pingd.Contacts',
                            icon: require('../assets/contacts_unselected.png'),
                            selectedIcon: require('../assets/contacts_selected.png'),
                        },
                        {
                            label: 'Ping List',
                            screen: 'pingd.PingList',
                            icon: require('../assets/ping_list_unselected.png'),
                            selectedIcon: require('../assets/ping_list_selected.png'),
                        },
                        {
                            label: 'Calendar',
                            screen: 'pingd.Calendar',
                            icon: require('../assets/calendar_unselected.png'),
                            selectedIcon: require('../assets/calendar_selected.png'),
                        },
                    ],
                });
                return;
            }

            case 'login': {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'pingd.Onboarding',
                        title: 'Login',
                    },
                });
                return;
            }

            default:
                console.log('Error occurred');
        }
    }
}
