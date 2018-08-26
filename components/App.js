// import {Component} from 'react';

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import contacts from '../api/redux/reducers/root';
import logger from 'redux-logger';

// import detectFirstLaunch from "../utils/detectFirstLaunch";

const store = createStore(contacts, applyMiddleware(logger));

registerScreens(store, Provider);

// export default class App extends Component {
//     constructor(props) {
//         super(props);
//         this.startApp();
//     }

    // startApp() {
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
//     }
// }
