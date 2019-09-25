import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { getMe, getRouteMatch} from '../store/selectors';
import { checkLogin, checkRouteAccessability } from '../store/actions';
import routes from '../routes';
import NotFoundPage from './NotFoundPage';
import './App.scss';

const mapStateToProps = (state) => ({
  isLoggedIn: !!getMe(state),
  route: getRouteMatch(state)
});
const mapDispatchToProps = { checkLogin, checkRouteAccessability };

class App extends React.PureComponent {
  async componentDidMount() {
    await this.props.checkLogin();
    this.props.checkRouteAccessability();
  }

  componentDidUpdate() {
    this.props.checkRouteAccessability();
  }

  renderRoute = (props) => {
    const { isLoggedIn } = this.props;
    const path = props.match.path;
    const route = routes.find(route => route.path === path);
    if (!route) return null;
    window.scrollTo(0, 0);
    const { auth, component: Component } = route;
    return auth && !isLoggedIn ? null : <Component />;
  };

  render() {
    return (
      <Fragment>
        {/* <Loader active={loader.active} /> */}
        <div className="App">
          <main>
            <ConnectedRouter history={this.props.history}>
              <Switch>
                {routes.map(({ path, exact }) => (
                  <Route key={path} path={path} exact={exact} render={this.renderRoute} />
                ))}
                <Route component={NotFoundPage} />
              </Switch>
            </ConnectedRouter>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
