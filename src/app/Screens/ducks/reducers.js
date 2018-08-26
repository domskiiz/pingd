import types from './types';

const initialState = {
    root: null,
};

const screensReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.APP_ROOT_CHANGED:
            return Object.assign({}, {root: action.root});
        default:
            return state;
    }
};

export default screensReducer;