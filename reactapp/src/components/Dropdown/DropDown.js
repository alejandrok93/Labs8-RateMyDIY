// Dependencies
import React from "react";
// import { Route } from "react-router-dom";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { sendEmail } from "../../actions";

// styled-components
const DropDownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid black;
  width: 304px;
  padding: 4px 8px;
  margin: 0 8px 0 auto;
`;
const SubscribeLink = styled.div`
  font-size: 14px;
  margin-right: 18px;
`;
const LogInLink = styled.a`
  font-size: 14px;
  margin-right: 18px;
`;

const SignUpLink = styled.a`
  font-size: 14px;
`;

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  // Sets state for the reactstrap modal
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  submitHandler = event => {
    event.preventDefault();
    this.props.sendEmail(this.state.to);
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.to)
  };

  render() {
    return (
      <DropDownWrapper>

        <SubscribeLink>
          <Button color="danger" onClick={this.toggle}>
            <h3>Subscribe to our test e-mail!</h3>

            {this.props.buttonLabel}{" "}
          </Button>
        </SubscribeLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          dialogClassName="my-modal"
        >
          <ModalHeader toggle={this.toggle}>
            Email Modal
            <form action=""></form>
          </ModalHeader>
          <ModalBody>Enter Email</ModalBody>
          <ModalBody>
            <form onSubmit={this.submitHandler}>
              <input
                type="text"
                value={this.state.to}
                name="to"
                onChange={this.changeHandler}
                required
              />
              <input type="submit" value="Send Email" />
            </form></ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Close Modal
            </Button>{" "}
          </ModalFooter>
        </Modal>


        {/* Conditional check to see if user is logged in */}
        {/* if not logged in, show the login/signup buttons */}
        <LogInLink>Log In</LogInLink> <SignUpLink>Signup</SignUpLink>
        {/* if logged in, show component that says "Hello NAME then have a signout button" */}
      </DropDownWrapper >
    );
  }
}

export default connect(
  null,
  { sendEmail }
)(DropDown);