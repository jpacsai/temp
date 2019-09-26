import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { getMe, getRouteMatch} from '../store/selectors';
import { checkLogin, checkRouteAccessability } from '../store/actions';
import routes from '../routes';
import NotFound from './pages/NotFound';

const mapStateToProps = (state) => ({
  isLoggedIn: !!getMe(state),
  route: getRouteMatch(state)
});

const mapDispatchToProps = {
  checkLogin,
  checkRouteAccessability
};

const renderRoute = ({ isLoggedIn, match: { path } }) => {
  const route = routes.find(route => route.path === path);
  if (!route) return null;
  window.scrollTo(0, 0);
  const { auth, component: Component } = route;
  return auth && !isLoggedIn ? null : <Component />;
};

const App = props => {

  // Run only at the first render
  useEffect(() => {
    const check = async () => await props.checkLogin();
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run at each render
  useEffect(() => {
    props.checkRouteAccessability();
  });

  return (
    <Fragment>
      {/* <Loader active={loader.active} /> */}
      <div className="App">
        <main>
          <ConnectedRouter history={props.history}>
            <Switch>
              {routes.map(({ path, exact }) => (
                <Route key={path} path={path} exact={exact} render={renderRoute} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
        </main>
      </div>
    </Fragment>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
