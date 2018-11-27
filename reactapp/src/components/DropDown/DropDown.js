// Dependencies
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { sendEmail } from '../../actions';

// date check for welcome message

const loginURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`;

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

class DropDown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}
	// Custom client greeting based of client hour
	clientGreeting() {
		let clientHourTime = new Date().getHours();
		if (clientHourTime < 10) {
			return "Good morning";
		} else if (clientHourTime <= 16 && clientHourTime >= 10) {
			return "Good afternoon";
		} else if (clientHourTime <= 24 && clientHourTime > 16) {
			return "Good evening";
		}
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
		console.log(this.state.to);
	};

	render() {
		return (
			<DropDownWrapper>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
					dialogClassName="my-modal"
				>
					<ModalHeader toggle={this.toggle}>
						Email Modal
						<form action="" />
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
						</form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>
							Close Modal
						</Button>{' '}
					</ModalFooter>
				</Modal>

				{/* Conditional check to see if user is logged in */}
				{/* if not logged in, show the login/signup buttons */}
				{this.props.userInfo.user_id ? (
					<Fragment>
						<WelcomeMessage>
							{this.clientGreeting()} {this.props.userInfo.username}
						</WelcomeMessage>
						<AuthButton href={logoutURL}>Signout</AuthButton>
					</Fragment>
				) : (
						<Fragment>
							<LogInLink href={loginURL}>Login</LogInLink>
							<AuthButton>Signup</AuthButton>
						</Fragment>
					)}

				{/* if logged in, show component that says "Hello NAME then have a signout button" */}
			</DropDownWrapper>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo
});

export default connect(
	mapStateToProps,
	{ sendEmail }
)(DropDown);

// styled-components
const DropDownWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-content: center;
	align-items: center;
	border: 1px solid black;
	width: 200px;
	padding: 4px 8px;
	margin: 0 8px 0 auto;
	overflow: hidden;
`;

const AuthButton = styled.button`
  cursor: pointer;
	color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
	display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

const LogInLink = styled.a`
	font-size: 14px;
	margin-right: 18px;
`;

const SignUpLink = styled.a`
	font-size: 14px;
`;

const WelcomeMessage = styled.p`
	font-size: 10px;
	margin-right: 18px;
	white-space: nowrap;
`;

const SignOutLink = styled.a`
	font-size: 14px;
`;