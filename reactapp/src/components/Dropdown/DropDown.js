// Dependencies
import React, { Fragment, Link } from "react";
import { connect } from "react-redux";

// import { Route } from "react-router-dom";
// import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios";
// import { Cookies } from "react-cookie";
// import cookie from "react-cookies";

//Constant variables
const loginURL = `${process.env.API_URL ||
  `http://localhost:${process.env.PORT}`}/signin`;

// styled-components
const DropDownWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  border: 1px solid black;
  width: 124px;
  padding: 4px 8px;
  margin: 0 8px 0 auto;
`;

const LogInLink = styled.a`
  font-size: 14px;
  margin-right: 18px;
`;

const SignUpLink = styled.a`
  font-size: 14px;
`;

const WelcomeMessage = styled.p`
  font-size: 14px;
  margin-right: 18px;
`;

const SignOutLink = styled.a`
  font-size: 14px;
`;
class DropDown extends React.Component {
  state = {};

  // componentDidMount() {
  //   axios
  //     .get("https://ratemydiy.herokuapp.com/api/users/user")
  //     .then(res => {
  //       console.log("getUserInfoResponse", res);
  //       return res;
  //     })
  //     .catch(err => {
  //       console.log("getUserInfoError", err);
  //       return err;
  //     });
  // }

  // doesHttpOnlyCookieExist(cookiename) {
  //   let date = new Date();
  //   date.setTime(date.getTime() + 1000);
  //   let expires = "expires=" + date.toUTCString();

  //   document.cookie = cookiename + "=new_value;path=/;" + expires;
  //   if (document.cookie.indexOf(cookiename + "=") == -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    // let cookieExists = this.doesHttpOnlyCookieExist("connect.sid");
    // let loggedIn = false;
    // console.log("cookie exists :  " + cookieExists);

    return (
      <DropDownWrapper>
        {/* Conditional check to see if user is logged in */}
        {/* if not logged in, show the login/signup buttons */}
        {/* if logged in, show component that says "Hello NAME then have a signout button" */}
        {this.props.userInfo ? (
          <Fragment>
            <WelcomeMessage>Welcome</WelcomeMessage>
            {this.props.userInfo.username}
            <SignOutLink>Signout</SignOutLink>
          </Fragment>
        ) : (
          <Fragment>
            <LogInLink href={loginURL}>Login</LogInLink>
            <SignUpLink>Signup</SignUpLink>
          </Fragment>
        )}
      </DropDownWrapper>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.loggedInReducer.userInfo
});

export default connect(mapStateToProps)(DropDown);
