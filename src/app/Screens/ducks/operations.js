import actions from './actions';

const changeAppRoot = actions.changeAppRoot;

/*
 * App has been started for the first time, and the onboarding
 * screens should appear.
 */
const appInitialized = () => {
    return async function(dispatch) {
        /*
         * App initialization code here
         */
        dispatch(changeAppRoot('login'));
    };
};

/*
 * Transition from onboarding to importing contacts.
 */
const login = () => {
    return async function(dispatch) {
        /*
         * Any login logic will go here
         */
        dispatch(changeAppRoot('importing'));
    };
};

/*
 * Indicates that the user was done importing contacts and
 * the main app should now be displayed.
 */
const contactsDoneImporting = () => {
    return async function(dispatch) {
        dispatch(changeAppRoot('app'));
    };
};

export default {
    changeAppRoot,
    appInitialized,
    login,
    contactsDoneImporting,
};