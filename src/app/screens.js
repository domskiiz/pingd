import {Navigation} from 'react-native-navigation';

import ContactsPage from './ContactsPage/ContactsPage';
import PingList from './PingList/PingList';
import Calendar from './Calendar/Calendar';
import Onboarding from './Onboarding/Onboarding';
import ImportAndSelectContactsPage
    from './ImportAndSelectContactsPage/ImportAndSelectContactsPage';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('pingd.Contacts', () =>
        ContactsPage, store, Provider
    );
    Navigation.registerComponent('pingd.Calendar', () =>
        Calendar, store, Provider
    );
    Navigation.registerComponent('pingd.PingList', () =>
        PingList, store, Provider
    );
    Navigation.registerComponent('pingd.Onboarding', () =>
        Onboarding, store, Provider
    );
    Navigation.registerComponent('pingd.ImportContacts', () =>
        ImportAndSelectContactsPage, store, Provider
    );
}
