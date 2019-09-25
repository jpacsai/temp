import React from 'react';
import './NotFoundPage.scss';
import { paths } from '../config';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <div className="NotFoundPage">
        <div className="title">404</div>
        <div className="message">
          PAGE NOT FOUND
        </div>
        <Link to={paths.DASHBOARD_PAGE}>
          Back to Dashboard
        </Link>
      </div>
    );
  }
}
