import { createSelector } from 'reselect';

export const getRouter = (state) => state.router;

export const getLocation = createSelector(
  getRouter,
  router => router.location
);

export const getPathname = createSelector(
  getLocation,
  location => location.pathname
);

export const getRouteMatch = createSelector(
  getRouter,
  router => router.match
);

export const getRouteQueryParams = createSelector(
  getRouter,
  router => router.query
);

export const getRouteMatchedPath = createSelector(
  getRouteMatch,
  routeMatch => (routeMatch ? routeMatch.match.path : null)
);

export const getMe = (state) => state.me;