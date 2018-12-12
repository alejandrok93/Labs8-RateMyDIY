// Dependencies
import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import { fetchSearchResults, fetchCategoryResults } from '../../actions';
import { connect } from 'react-redux';
import './SearchPage.css';
import styled from 'styled-components';
import queryString from 'query-string';

//Import components
import {
	// SearchBar,
	ProjectTile,
	SearchPageSearchBar,
	// Nav,
	Header
} from '../../components';

const SearchPageWrapper = styled.div`
	width: 100%;
`;

const NoSearchResults = styled.div`
	margin: 50px auto;
	font-size: 24px;
`;

class SearchPage extends Component {
	constructor() {
		super();
		this.state = { input: '', searchTerm: '' };
	} // useless constructor

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		if (values.query) {
			this.setState({ searchTerm: values.query });
		}
		this.props.fetchSearchResults(values.query);
	}

	handleChange = e => {
		console.log(e.target.value);
		this.setState({
			...this.state,
			input: e.target.value,
			searchTerm: e.target.value
		});
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	handleFilterCategoryFood = e => {
		e.preventDefault();
		const searchTerm = 'food';
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
	};

	handleFilterCategoryTech = e => {
		e.preventDefault();
		const searchTerm = 'tech';
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
	};

	handleFilterCategoryHome = e => {
		e.preventDefault();
		const searchTerm = 'Home Improvement';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
	};
	render() {
		console.log(this.props);
		return (
			<SearchPageWrapper>
				<Header
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
					searchTerm={this.state.searchTerm}
				/>
				<div className="search-page-container">
					<div className="search-options" />
					<div className="search-results">
						{this.props.projects.length === 0 &&
						this.props.gettingSearchResults === false ? (
							<NoSearchResults>No projects found </NoSearchResults>
						) : (
							''
						)}
						<SearchPageSearchBar
							handleFilterCategoryFood={this.handleFilterCategoryFood}
							handleFilterCategoryTech={this.handleFilterCategoryTech}
							handleFilterCategoryHome={this.handleFilterCategoryHome}
							handleChange={this.handleChange}
						/>

						{this.props.projects.map(project => (
							<ProjectTile
								history={this.props.history}
								key={project.project_id}
								project={project}
							/>
						))}
					</div>
				</div>
			</SearchPageWrapper>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		projects: state.searchReducer.projects,
		gettingSearchResults: state.searchReducer.gettingSearchResults
	};
};

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchCategoryResults }
)(SearchPage);
