// Import Dependencies
import React, { Component } from 'react';
// import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';
//Added Redux imports
import { fetchSearchResults } from '../../actions/index';
import { connect } from 'react-redux';

//Import components
import {
	DropDown,
	FeaturedProjects,
	PopularMakers,
	PopularReviewers,
	SearchBar,
	Twillio
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
`;
const DropdownMenu = styled.div`
	width: 100%;
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
		//call featch search results action
		this.props.fetchSearchResults(this.state.input);

		//push to search page
		this.props.history.push('/search');
	};

	render() {
		// console.log(SearchBar);
		return (
			<LandingPageWrapper>
				<DropdownMenu>
					<DropDown />
				</DropdownMenu>
				<LandingPageContentWrapper>
					<SearchBar
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					<Twillio />
					<FeaturedProjects />
					<PopularMakers />
					<PopularReviewers />
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
	{ fetchSearchResults }
)(LandingPage);
