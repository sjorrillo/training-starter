import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../helpers/auth-helper';

@connect(
  state => ({
    isUserAuthenticated: state.authStore.loggedIn && !!state.authStore.user,
    user: state.authStore.user,
  }),
)
export default class App extends Component {
  handleLogout = () => logout();

  renderPrivateSection = user => (
    <div>
      {`Hello: ${user.name}` }
      <button type="button" role="button" onClick={this.handleLogout}>Logout</button>
    </div>
  );

  render({ isUserAuthenticated, user } = this.props) {
    return (
      <div>
        { isUserAuthenticated && this.renderPrivateSection(user)}
        { this.props.children }
      </div>
    );
  }
}
