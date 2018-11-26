// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
//Import components
import { ReviewerTile } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getPopularReviewers } from '../../../actions/landingPageActions';


// styled-components

const PopularReviewersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
`;

const PopularReviewersListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: space-between;
`;

const PopularMakersTitle = styled.h1`
	font-size: 18px;
	width: 100%;
	margin: 10px 25px;
`;

class PopularReviewers extends Component {
	componentDidMount() {
		this.props.getPopularReviewers();
		console.log("this.props.getPopularReviewers", this.props.popularReviewers)
	}
	render() {
		return (
			<PopularReviewersWrapper>
				<PopularMakersTitle>Popular Reviewers</PopularMakersTitle>
				<PopularReviewersListTiles>
					{this.props.popularReviewers.map(reviewer => (
						<ReviewerTile reviewer={reviewer} key={reviewer.reviewer_id} />
					))}
				</PopularReviewersListTiles>
			</PopularReviewersWrapper>
		);
	}
}

const mapStateToProps = state => ({
	popularReviewers: state.landingPageReducer.featuredProjects,
	fetching: state.landingPageReducer.fetching,
	error: state.landingPageReducer.error
});

export default connect(
	mapStateToProps,
	{ getPopularReviewers }
)(PopularReviewers);