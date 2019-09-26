import { push } from 'connected-react-router';
import { getRouteMatch, getMe } from '../selectors/index';
import { paths, nonAuthRoutes } from '../../config';
import { routeAccessability } from '../../routes';

export const checkRouteAccessability = () => (dispatch, getState) => {
  const me = getMe(getState());
  if (!me) return true;

  const match = getRouteMatch(getState());
  if (!match) return false;

  const roles = me.roles;
  const hasAccess = routeAccessability[match.match.path] ? routeAccessability[match.match.path](roles, match) : true;
  if (!hasAccess) dispatch(push(paths.DASHBOARD_PAGE));
};

export const checkLogin = () => async (dispatch, getState, { cookie }) => {
  try {
    const routeMatch = getRouteMatch(getState());
    if (!!routeMatch && nonAuthRoutes.includes(routeMatch.match.path)) return;

    const isSignedIn = !!cookie.get('jwt');
    if (!isSignedIn) {
      if (!routeMatch || routeMatch.match.path !== paths.LOGIN_PAGE) dispatch(push(paths.LOGIN_PAGE));
    } else {
      dispatch(push(paths.DASHBOARD_PAGE));
      // TODO: await dispatch(login());
    }
  } catch (error) {
    console.error(error);
  }
};
