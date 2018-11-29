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

//Import components
import {
	Nav,
	FeaturedProjects,
	PopularMakers,
	PopularReviewers,
	SearchBar,
	Twillio,
	Footer
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
		this.state = { input: '' };
	}

	handleChange = e => {
		console.log(e.target.value);
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		const searchTerm = this.state.input;
		//call featch search results action
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
					<Twillio />
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
	projects: state.searchReducer.projects
});

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchProjectsByReviewer }
)(LandingPage);
