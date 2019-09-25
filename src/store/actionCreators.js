import * as actionNames from './actionNames';

export const clear = () => (dispatch) => dispatch(actionNames.CLEAR);
export const resolveMe = (me) => (dispatch) => dispatch(actionNames.RESOLVE_ME, me);