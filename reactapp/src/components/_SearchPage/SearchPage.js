// Dependencies
import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import { fetchSearchResults } from '../../actions';
import { connect } from 'react-redux';
import './SearchPage.css';

//Import components
import { SearchBar, ProjectTile } from '../../components';

class SearchPage extends Component {
	constructor() {
		super();
		this.state = { input: '' };
	} // useless constructor

	componentDidMount() {}
	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		//call featch search results action
		this.props.fetchSearchResults(this.state.input);

		//push to search page
		this.props.history.push('/search');
	};

	render() {
		console.log(this.props.projects);
		return (
			<div className="search-page-container">
				<SearchBar
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
				/>

				<div className="search-options" />
				<div className="search-results">
					<h1>Search results</h1>
					{this.props.projects.map(project => (
						<ProjectTile project={project} />
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		projects: state.searchReducer.projects
	};
};

export default connect(
	mapStateToProps,
	{ fetchSearchResults }
)(SearchPage);
