// Import Dependencies
import React, { Component } from 'react';
// import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';
//Added Redux imports
import {
	fetchSearchResults,
	fetchProjectsByReviewer
} from '../../actions/index';
import { connect } from 'react-redux';
import MenuDrawer from '../MenuDrawer/MenuDrawer';

// ReactStrap
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Import components
import {
	Nav,
	FeaturedProjects,
	PopularMakers,
	PopularReviewers,
	SearchBar,
	Twillio,
	Footer,
	LogInPopUp
} from '../../components';

// styled-components
const LandingPageContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	width: 80%;
`;
const LandingPageWrapper = styled.div`
	width: 100%;

	@media (max-width: 500px) {
		width: 100vw;
	}
`;

class LandingPage extends Component {
	constructor() {
		super();
		this.state = { input: '', modal: false, toggleLogInPopUp: false };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleChange = e => {
		console.log(e.target.value);
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		const searchTerm = this.state.input;
		e.preventDefault();
		//if not signed in,
		if (!this.props.loggedInObject.userInfo.user_id) {
			//this.toggle();
			//toggle loginpopup on
			this.setState({
				...this.state,
				toggleLogInPopUp: !this.state.toggleLogInPopUp
			});
		} else {
			//call featch search results action
			this.props.fetchSearchResults(this.state.input);

			//push to search page
			this.props.history.push(`/search?query=${searchTerm}`);
		}
	};

	searchWithoutLogin = () => {
		//call featch search results action
		const searchTerm = this.state.input;
		this.props.fetchSearchResults(this.state.input);

		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	searchClick = input => {
		console.log('search for this maker: ' + input);

		//call featch search results action
		this.props.fetchSearchResults(input);

		//push to search page
		this.props.history.push(`/search?query=${input}`);
	};

	getProjectsByReviewer = username => {
		console.log('search for this reviewer : ' + username);
		this.props.fetchProjectsByReviewer(username);

		//push to search page
		this.props.history.push(`/search?user=${username}`);
	};

	render() {
		return (
			<LandingPageWrapper>
				{window.innerWidth <= 500 ? <MenuDrawer /> : <Nav />}
				<LandingPageContentWrapper>
					<SearchBar
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					{this.state.toggleLogInPopUp ? (
						<LogInPopUp
							searchWithoutLogin={this.searchWithoutLogin}
							toggleLogInPopUp={this.state.toggleLogInPopUp}
						/>
					) : (
						//  'hey please log in'
						''
					)}
					<FeaturedProjects />
					<PopularMakers fetchSearchResults={this.searchClick} />
					<PopularReviewers
						getProjectsByReviewer={this.getProjectsByReviewer}
					/>
					<Footer />
				</LandingPageContentWrapper>
			</LandingPageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	projects: state.searchReducer.projects,
	loggedInObject: state.loggedInReducer
});

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchProjectsByReviewer }
)(LandingPage);
