import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import cookie from 'js-cookie';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import history from '../utils/history';
import io from '../utils/io';

const extraArguments = {
  io: io(),
  cookie,
  window
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(extraArguments)))
);

export default store;