// Dependencies
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import styled from 'styled-components';
import { DropDown } from '../../components';
import { Button } from 'reactstrap';
import { sendEmail } from '../../actions';

// date check for welcome message

const loginURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`;

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

class Nav extends React.Component {
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
			return 'Good morning';
		} else if (clientHourTime <= 16 && clientHourTime >= 10) {
			return 'Good afternoon';
		} else if (clientHourTime <= 24 && clientHourTime > 16) {
			return 'Good evening';
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
			<NavWrapper>
				<AuthWrapper>
					{/* Conditional check to see if user is logged in */}
					{/* if not logged in, show the login/signup buttons */}
					{this.props.userInfo.user_id ? (
						<Fragment>
							<WelcomeMessage>
								{this.clientGreeting()} {this.props.userInfo.username}
							</WelcomeMessage>
							<DropDown />
						</Fragment>
					) : (
						<Fragment>
							<a href={loginURL}>
								<Button color="primary">
									<h3>Login/Signup</h3>
								</Button>
							</a>
						</Fragment>
					)}

					{/* if logged in, show component that says "Hello NAME then have a signout button" */}
				</AuthWrapper>
			</NavWrapper>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo
});

export default connect(
	mapStateToProps,
	{ sendEmail }
)(Nav);

// styled-components
const NavWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	margin: 0 8px 0 auto;
	max-width: 20%;
	min-width: 10%;

	@media (max-width: 800px) {
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}
`;
const AuthWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 0 8px 0 auto;
	padding: 4px 8px;
	padding: 10px;
	/* overflow: hidden; */

	@media (max-width: 500px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: none;
	}
`;

const WelcomeMessage = styled.p`
	font-size: 14px;
	margin-right: 8px;
	white-space: nowrap;

	@media (max-width: 500px) {
		display: none;
	}
`;
