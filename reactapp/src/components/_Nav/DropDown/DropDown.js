import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
        <DropdownToggle caret>
          Menu
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link to={`/users/${this.props.userInfo.user_id}`}>
              My Profile
					  </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={`/users/${this.props.userInfo.user_id}/settings`}>
              Profile Settings
            </Link >
          </DropdownItem>
          <DropdownItem>
            <Link to={`/newproject`}>
              New Project
            </Link >
          </DropdownItem>
          {window.screen.width <= 500 ? 
          <DropdownItem>
            <Link to={logoutURL}>
              Signout
            </Link>
          </DropdownItem> : null }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.loggedInReducer.userInfo,
});

export default connect(
  mapStateToProps
)(DropDown);