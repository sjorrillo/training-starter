import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/modules/auth';

@connect(
  state => ({
    user: state.authStore.user,
  }),
  dispatch => bindActionCreators({
    login,
  }, dispatch)
)
export default class Login extends Component {
  handleSignInDefaultDispatchClick = () => {
    this.props.login('SJOrrillo', 'defaultDispatch');
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
        {this.renderDemoSection(this.handleSignInDefaultDispatchClick)}
      </div>
    );
  }
}
