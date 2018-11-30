import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyReviews } from '../../../actions';
import { AccountSideBar } from '../../../components';

import './ReviewList.css';

class ReviewList extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.userInfo !== this.props.userInfo) {
			console.log('USERINFO', this.props.userInfo);
			this.props.fetchMyReviews(this.props.userInfo.user_id);
		}
		console.log(this.props.myReviews);
	}

	render() {
		if (!this.props.myReviews || this.props.myReviews.length === 0) {
			return (
				<div className="reviewPage">
					<div className="sideBar">
						<AccountSideBar />
					</div>
					<div className="addNewReview">
						<h2>Add a new review</h2>
						<Link to="">
							<img
								alt="PLACEHOLDER! alt text"
								src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
							/>
						</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div className="reviewPage">
					<AccountSideBar />

					<div className="myReviewDisplay">
						{this.props.myReviews.map(myReviews => {
							return (
								<div className="myReviewsDisplay" key={myReviews.review_id}>
									<h2>{myReviews.text}</h2>
									<p>{myReviews.rating}</p>
									<img src={myReviews.img_url} alt="" />
								</div>
							);
						})}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		myReviews: state.myProjectReducer.myReviews,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ fetchMyReviews }
)(ReviewList);
