// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getEmail, updateEmail } from '../../../actions/settingActions';

import { Nav, Twillio } from '../../../components';
//Styles
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 550px;
  width: 100%;
  background: #bbb;
  margin-top: 98px;
`;

class UserSettingSettings extends Component {
  state = {
    email: 'test@email.com',
	fetching: '',
  };
  
 
  componentDidMount() {
    this.props.getEmail();
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.updateEmail(this.state);
    this.setState({
      email: ''
    });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
		
        <SettingsContainer>
          <Twillio />
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              value={this.state.email}
              name="email"
              onChange={this.changeHandler}
            />
            <input type="submit" value="Change Email" />
          </form>
          Current Email: {this.state.email}
        </SettingsContainer>
      
    );
  }
}

const mapStateToProps = state => ({
  user: state.settingsReducer.users,
  error: state.settingsReducer.error
});

export default connect(
  mapStateToProps,
  { getEmail, updateEmail }
)(UserSettingSettings);
