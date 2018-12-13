import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyReviews, fetchSearchResults, loggedIn, getFeaturedProjects } from '../../../actions';
import { AccountSideBar } from '../../../components';
import { Header } from '../../../components';
import styled from 'styled-components';
import './ReviewList.css';
// import styled from 'styled-components';
import { ReviewRender } from '../../../components';
import { ProjectTile } from '../../../components';
// const CardLink = styled.a`
//   text-decoration: none;
//   color:black &:hover {
//     text-decoration: none;
//     color: black;
//   }
// `;

const SelectHeader = styled.h1`
	color: ${props => props.theme.mui.palette.primary.dark};
	font-weight: bold;
`;

const FeaturedProjectListTiles = styled.div`
	display: flex;
	flex-direction: column
	/* justify-content: space-between; */

	@media (max-width: 500px) {
		width: 100%;
		// align-self: center;
	}
`;

class ReviewList extends Component {
	constructor() {
		super();
		this.state = { input: '' };
	}

	componentDidMount() {
		this.props.loggedIn(fetchMyReviews);
		this.props.getFeaturedProjects();
	}

	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
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

	render() {
		console.log('REVIEWS', this.props.myReviews)
		if (!this.props.myReviews || this.props.myReviews.length === 0) {
			return (
				<div className='reviewPage'>
					<Header
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					{window.innerWidth <= 500 ? null : <AccountSideBar />}
					{window.innerWidth <= 500 ? 
					<SelectHeader className='selectHeader'>Select a project to review</SelectHeader>
					:
					<div className="addNewReview">
					<h2>New Review</h2>
						<Link to={`/projects`}>
							<img
								alt="PLACEHOLDER! alt text"
								src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
							/>
						</Link>
					</div>}
					<FeaturedProjectListTiles>
						{this.props.featuredProjects.map(project => (
							<ProjectTile
								history={this.props.history}
								project={project}
								key={project.project_id}
							/>
						))}
					</FeaturedProjectListTiles>
				</div>
			);
		} else {
			return (
				<div className='reviewPage'>
					<Header
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					{window.innerWidth <= 500 ? null : <AccountSideBar />}
					{window.innerWidth <= 500 ? 
					<SelectHeader className='selectHeader'>Your Reviews</SelectHeader>
					:
					<div className="addNewReview">
					<h2>New Review</h2>
						<Link to={`/projects`}>
							<img
								alt="PLACEHOLDER! alt text"
								src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
							/>
						</Link>
					</div>}

					<div className="myReviewDisplay">
						{this.props.myReviews.map(myReviews => (
							<ReviewRender
								key={myReviews.review_id}
								myReview_id={myReviews.project_id}
								myReviewsText={myReviews.text}
								myReviewsImg_url={myReviews.img_url}
								myReviewsRating={myReviews.rating}
								projectName={myReviews.project_name}
							/>
						))}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		myReviews: state.myProjectReducer.myReviews,
		featuredProjects: state.landingPageReducer.featuredProjects,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ fetchMyReviews, fetchSearchResults, loggedIn, getFeaturedProjects }
)(ReviewList);
