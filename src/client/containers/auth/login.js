import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, loginCustomDispacher } from '../../redux/modules/auth';

@connect(
  state => ({
    user: state.authStore.user,
  }),
  dispatch => bindActionCreators({
    login,
    loginCustomDispacher,
  }, dispatch)
)
export default class Login extends Component {
  handleSignInDefaultDispatchClick = () => {
    this.props.login('admin', 'admin');
  };

  handleSignInCustomDispatchClick = () => {
    this.props.loginCustomDispacher('javier', 'customDispatch');
  };

  renderDemoSection = (onclickHandler, buttonText = 'Sign In') => {
    const { user } = this.props;
    return (
      <div>
        <button type="button" role="button" onClick={onclickHandler}>{buttonText}</button>
        <div>
          {JSON.stringify(user, null, 2)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h3>Login Component</h3>
        <label>Username:</label>
        <input></input>
        <label>Password:</label>
        <input></input>
        {this.renderDemoSection(this.handleSignInDefaultDispatchClick)}
        {this.renderDemoSection(this.handleSignInCustomDispatchClick, 'Sign In Custom Dispatch')}
      </div>
    );
  }
}
