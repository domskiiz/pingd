import React, {Component} from 'react'; // eslint-disable-line no-unused-vars

import configureStore from '../store';

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';

import {Provider} from 'react-redux';

import screensOperations from './Screens/ducks/index';


const storage = configureStore();
registerScreens(storage.store, Provider);

export default class App extends Component {
    constructor(props) {
        super(props);
        /*
         *  Uncomment following line to purge state of app, and run app once.
         */
        storage.persistor.purge();
        storage.store.subscribe(this.onStoreUpdate.bind(this));
        storage.store.dispatch(screensOperations.appInitialized());
    }

    onStoreUpdate() {
        let {root} = storage.store.getState().appState;
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
                            icon: require('../../assets/contacts_unselected.png'),
                            selectedIcon: require('../../assets/contacts_selected.png'),
                        },
                        {
                            label: 'Ping List',
                            screen: 'pingd.PingList',
                            icon: require('../../assets/ping_list_unselected.png'),
                            selectedIcon: require('../../assets/ping_list_selected.png'),
                        },
                        {
                            label: 'Calendar',
                            screen: 'pingd.Calendar',
                            icon: require('../../assets/calendar_unselected.png'),
                            selectedIcon: require('../../assets/calendar_selected.png'),
                        },
                    ],
                });
                return;
            }

            case 'login': {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'pingd.Onboarding',
                    },
                });
                return;
            }

            case 'importing': {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'pingd.ImportContacts',
                    },
                });
                return;
            }

            default:
                console.log('Error occurred');
        }
    }
}
