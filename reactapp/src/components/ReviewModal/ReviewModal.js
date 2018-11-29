// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { NewReview } from '../../components';

// Actions
import {
	getReview
	// willUpdateReview,
	// willDeleteReview,
	// deleteReview
} from '../../actions';

// Styles
import styled from 'styled-components';
import StarCount from '../StarCount/StarCount';

const ModalShade = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(200, 200, 200, 0.75);
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	width: 440px;
	height: 590px;
	background: white;
	padding: 20px;
	border: 2px solid #9a9a9a;
	transform: translate(-50%, -50%);
`;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 250px;
	background: #cceeee;
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const CloseModalButton = styled.button`
	align-self: flex-end;
`;

const ProjectTitle = styled.h2``;

const Reviewer = styled.h3``;

const ReviewText = styled.p`
	width: 100%;
	height: 160px;
	background: #cceeee;
	margin: 16px 0 20px;
	resize: none;
`;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const LikeContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const Like = styled.button``;

const Dislike = styled.button``;

const StatusMessage = styled.p``;

class ReviewModal extends Component {
	state = {};

	componentDidMount() {
		if (this.props.review_id) this.props.getReview(this.props.review_id);
	}

	render() {
		return (
			<ModalShade>
				{/* todo: click outside modal to close it */}
				<ModalBox>
					{this.props.review_id ? (
						<React.Fragment>
							<CloseModalButton onClick={this.props.closeModal}>
								x
							</CloseModalButton>
							{this.props.gettingReview && !this.props.review ? (
								<StatusMessage>Loading review...</StatusMessage>
							) : this.props.gettingReviewError ? (
								<StatusMessage>{this.props.gettingReviewError}</StatusMessage>
							) : (
								<React.Fragment>
									<ProjectTitle>{`@${this.props.review.maker_name}'s ${
										this.props.review.project_name
									}`}</ProjectTitle>
									<Reviewer>{`Review by: @${
										this.props.review.reviewer_name
									}`}</Reviewer>
									<Img
										src={this.props.review.img_url}
										alt={this.props.review.img_url || 'project image'}
									/>
									<StarCount rating={this.props.review.rating} />
									<ReviewText>{this.props.review.text}</ReviewText>

									{this.props.review.reviewer_id ===
									this.props.userInfo.user_id ? (
										<ButtonContainer>
											<EditButton>Edit Review</EditButton>
											<DeleteButton>Delete Review</DeleteButton>
										</ButtonContainer>
									) : (
										<LikeContainer>
											<Like>*thumbsup*</Like>
											<p>Helpful?</p>
											<Dislike>*thumbsdown*</Dislike>
										</LikeContainer>
									)}
								</React.Fragment>
							)}
						</React.Fragment>
					) : this.props.project_id && this.props.userInfo.user_id ? (
						<NewReview
							user_id={this.props.userInfo.user_id}
							username={this.props.userInfo.username}
							project_id={this.props.project_id}
							project_name={this.props.project_name}
							maker_name={this.props.maker_name}
							img_url={this.props.img_url}
							closeModal={this.props.closeModal}
						/>
					) : (
						<StatusMessage>How did you get here? Tell Max.</StatusMessage>
					)}
				</ModalBox>
			</ModalShade>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		review: state.reviewReducer.review,

		gettingReview: state.reviewReducer.gettingReview,
		gettingReviewError: state.reviewReducer.gettingReviewError,

		reviewToUpdate: state.reviewReducer.reviewToUpdate,

		reviewToDelete: state.reviewReducer.reviewToDelete,
		deletingReview: state.reviewReducer.deletingReview,
		deletingReviewError: state.reviewReducer.deletingReviewError
	};
};

export default connect(
	mapStateToProps,
	{
		getReview
		// willUpdateReview,
		// willDeleteReview,
		// deleteReview
	}
)(ReviewModal);
