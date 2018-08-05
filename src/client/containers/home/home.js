import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Login from '../auth/login';

@connect(
  state => ({
    user: state.authStore.user,
    loggingOut: state.authStore.loggingOut,
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)
export default class Home extends Component {
  gotToPrivateUrl = () => browserHistory.push('/profile');

  renderHome = () => (
    <div>
      <h3>Home Component</h3>

      <div>
        <button type="button" role="button" onClick={this.gotToPrivateUrl}>Go to Private URL</button>
      </div>
    </div>
  );

  render({ user, loggingOut } = this.props) {
    if (user && !loggingOut) {
      return this.renderHome();
    }

    return <Login />;
  }
}
