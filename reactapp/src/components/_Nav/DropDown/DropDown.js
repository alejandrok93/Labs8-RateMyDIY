import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

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
