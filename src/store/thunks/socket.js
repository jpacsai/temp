import {

} from '../actionCreators';

export const initSocketIO = () => async (dispatch, getState, { cookie, io }) => {
  const jwt = cookie.get('jwt');
  if (!jwt) throw new Error('Missing jwt');
  io.connect(jwt, error => console.error(error));

  /* io.on('user-update', (user) => {
    dispatch(resolveUser(user));
  }); */
};
