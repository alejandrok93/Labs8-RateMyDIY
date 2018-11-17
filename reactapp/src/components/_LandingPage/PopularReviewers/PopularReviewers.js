// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";

//Import components
import { ReviewerTile } from '../../../components';

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
	// constructor() {
	//   super();
	// } // useless constructor
	componentDidMount() {}
	render() {
		return (
			<PopularReviewersWrapper>
				<PopularMakersTitle>Popular Reviewers</PopularMakersTitle>
				<PopularReviewersListTiles>
					{this.props.reviewers.map(reviewer => (
						<ReviewerTile reviewer={reviewer} key={reviewer.reviewer_id} />
					))}
				</PopularReviewersListTiles>
			</PopularReviewersWrapper>
		);
	}
}

export default PopularReviewers;
