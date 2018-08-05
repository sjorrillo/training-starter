import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { testPrivateRequest } from '../../redux/modules/profile';

@connect(
  () => ({}),
  dispatch => bindActionCreators({
    testPrivateRequest,
  }, dispatch)
)
export default class Profile extends Component {
  handleRequestWithToken = () => {
    this.props.testPrivateRequest();
  };

  render() {
    return (
      <div>
        <h3>Profile Component</h3>
        <p>this is a private component</p>

        <div>
          <button type="button" role="button" onClick={this.handleRequestWithToken}>Request with token</button>
        </div>
      </div>
    );
  }
}
