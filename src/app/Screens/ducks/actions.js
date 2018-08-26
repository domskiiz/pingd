import types from './types';

/**
 * @typedef {Object} ChangeAppRootAction
 * @param {string} root - Indicates what stage the app should transition to.
 * @return {changeAppRootAction}
 */
const changeAppRoot = (root) => {
    return {
        type: types.APP_ROOT_CHANGED,
        root,
    };
};

export default {
    changeAppRoot,
};
