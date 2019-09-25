import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../config';

import './LoginPage.scss';

class LoginPage extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
      <div>
        Login Page
      </div>
    );
  }

}

export default LoginPage;

