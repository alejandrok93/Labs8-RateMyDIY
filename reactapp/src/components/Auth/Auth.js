import React, { Component } from 'react'; // removed { component } from import
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUsername } from '../../actions';
axios.defaults.withCredentials = true;
class Auth extends Component {
	state = {
		username: ''
	}

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};


	changeName = event => {
		event.preventDefault();
		this.props.getUsername(this.state.username);
	}

	render() {
		if (this.props.redirect) {
			return <Redirect push to={this.props.redirect} />;
		} else if (this.props.error) {
			return (
				<div>
					<h2>{this.props.error.error}</h2>
					<input 
						type='text'
						value={this.state.username}
						name='username'
						onChange={this.changeHandler}
					/>
					<button onClick={this.changeName}>Submit</button>
				</div>
			);
		} else {
			return (
				<div>
					<input 
						type='text'
						value={this.state.username}
						name='username'
						onChange={this.changeHandler}
					/>
					<button onClick={this.changeName}>Submit</button>
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	gettingUsername: state.usernameReducer.gettingUsername,
	username: state.usernameReducer.username,
	error: state.usernameReducer.error,
	redirect: state.usernameReducer.redirect

});

export default connect(mapStateToProps, { getUsername })(Auth);