export const ROOT_CHANGED = 'ROOT_CHANGED';

export function changeAppRoot(root) {
  return {
    type: ROOT_CHANGED,
    root,
  };
}

export function appInitialized() {
    return async function(dispatch) {
        /*
         * App initialization code here
         */
        dispatch(changeAppRoot('login'));
    };
}
export function login() {
    return async function(dispatch) {
        /*
         * Any login logic will go here
         */
        dispatch(changeAppRoot('app'));
    };
}
