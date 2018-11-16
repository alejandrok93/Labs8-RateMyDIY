// Dependencies
import React from "react";
// import { Route } from "react-router-dom";
// import { connect } from "react-redux";
import styled from 'styled-components';

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
const DropDown = props => {

  return (
    <DropDownWrapper>
      {/* Conditional check to see if user is logged in */}
      {/* if not logged in, show the login/signup buttons */}
      <LogInLink>Log In</LogInLink> <SignUpLink>Signup</SignUpLink>
      {/* if logged in, show component that says "Hello NAME then have a signout button" */}
    </DropDownWrapper>
  );
}
export default DropDown