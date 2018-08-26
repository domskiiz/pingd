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
				},
                {
                    label: 'Ping List',
                    screen: 'pingd.PingList',
                },
                {
					label: 'Calendar',
					screen: 'pingd.Calendar',
				},
			],
		});
//     }
// }
