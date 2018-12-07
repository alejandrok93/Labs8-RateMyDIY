// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import {
	Project,
	EditProject,
	Post,
	NewPost,
	EditPost,
	ReviewModal,
	ConfirmModal,
	Header
} from '../../components';

// Actions
import {
	loggedIn,
	getProject,
	// loggedIn_Project_ReviewId_Chain,
	project_ReviewId_Chain,
	getReviewId,
	willUpdateProject,
	deleteProject,
	willAddPost,
	willUpdatePost,
	willDeletePost,
	showReviewModal,
	setRedirect
} from '../../actions';

// Styles
import styled from 'styled-components';

const ProjectPageHeaderContainer = styled.div`
	width: 100%;
`;

const ProjectPageContainer = styled.div`
	display: flex;
	justify-content: center;
	/* margin: 100px auto 0 auto; */
	margin: 100px auto;
	width: 100%;
`;

const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 40%;
	max-width: 750px;
`;

const SideBarContainer = styled.div`
	display: flex;
	border: 1px solid green;
	margin: 0 0 0 5px;
	width: 10%;
	min-width: 150px;
	height: 500px;
	min-height: 500px;
`;

const StatusMessage = styled.p``;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
`;

const ProjectButton = styled.button``;

const ReviewButton = styled.button``;

class ProjectPage extends Component {
	state = {};

	// Delete project (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.setState({
			confirm: {
				text: [
					'Are you sure? This cannot be undone.',
					'Cancel',
					'Delete Project'
				],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();

					this.props.deleteProject(
						this.props.project.project_id,
						this.props.userInfo.user_id
					);
					this.setState({ confirm: undefined });
				}
			}
		});
	};

	// Redirect to signup (this doesn't work yet)
	notLoggedInHandler = () => {
		this.setState({
			confirm: {
				text: [
					`You aren't logged in! todo: add a redirect to signup`,
					'Cancel',
					'Cancel'
				],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				}
			}
		});
	};

	// Visiting this page calls loggedIn() twice. Will fix later.
	componentDidMount() {
		// Trying out this awkward action chain
		// this.props.loggedIn_Project_ReviewId_Chain(this.props.match.params.id);

		this.props.loggedIn(project_ReviewId_Chain, this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.setRedirect(null);
	}

	render() {
		// Redirect
		if (this.props.redirect) {
			return <Redirect push to={this.props.redirect} />;
		} else {
			// Evaluates to true if user is author
			const owner = this.props.project.user_id === this.props.userInfo.user_id;

			// Disable other buttons if there is an active form
			const disabled =
				this.props.projectToUpdate ||
				this.props.postToAdd ||
				this.props.postToUpdate ||
				this.props.postToDelete;

			return (
				<ProjectPageHeaderContainer>
					<Header />
					<ProjectPageContainer>
						<ProjectContainer>
							{/* Might be a good idea to replace these with a switch */}
							{this.props.projectToUpdate ? (
								<EditProject
									user_id={this.props.userInfo.user_id}
									project={this.props.project}
									willUpdateProject={this.props.willUpdateProject}
								/>
							) : this.props.gettingUserInfo ||
							  this.props.gettingProject ||
							  this.props.gettingReviewId ? (
								<React.Fragment>
									<StatusMessage>Loading project...</StatusMessage>
								</React.Fragment>
							) : this.props.gettingProjectError ? (
								<React.Fragment>
									<StatusMessage>Failed to load project</StatusMessage>
									<StatusMessage error>
										{this.props.gettingProjectError}
									</StatusMessage>
								</React.Fragment>
							) : this.props.deletingProject ? (
								<React.Fragment>
									<StatusMessage>Deleting project...</StatusMessage>
								</React.Fragment>
							) : this.props.deletingProjectError ? (
								<React.Fragment>
									<StatusMessage>Failed to delete project</StatusMessage>
									<StatusMessage error>
										{this.props.gettingProjectError}
									</StatusMessage>
								</React.Fragment>
							) : (
								<Project
									project={this.props.project}
									owner={owner}
									willUpdateProject={this.props.willUpdateProject}
									deleteHandler={this.deleteHandler}
									disabled={disabled}
								/>
							)}

							{/* Display posts */}
							{this.props.project.posts &&
								this.props.project.posts.map(post =>
									post.post_id === this.props.postToUpdate ? (
										<EditPost
											key={post.post_id}
											user_id={this.props.userInfo.user_id}
											project_id={this.props.project.project_id}
											post={post}
											willUpdatePost={this.props.willUpdatePost}
										/>
									) : (
										<Post
											key={post.post_id}
											post={post}
											user_id={this.props.userInfo.user_id}
											owner={owner}
											willUpdatePost={this.props.willUpdatePost}
											willDeletePost={this.props.willDeletePost}
											postToDelete={post.post_id === this.props.postToDelete}
											disabled={disabled}
										/>
									)
								)}

							{/* Add new post */}
							{this.props.postToAdd && (
								<NewPost
									postType={this.props.postToAdd}
									user_id={this.props.userInfo.user_id}
									project_id={this.props.project.project_id}
									willAddPost={this.props.willAddPost}
								/>
							)}

							{/* Bottom buttons */}
							{!this.props.gettingUserInfo &&
								!this.props.gettingReviewId &&
								!this.props.gettingProject &&
								!this.props.gettingProjectError &&
								!this.props.deletingProject &&
								!this.props.deletingProjectError &&
								!this.props.postToAdd &&
								(owner ? (
									<ButtonContainer>
										<ProjectButton
											onClick={() => this.props.willAddPost('text')}
											disabled={disabled}
										>
											Add Text Field
										</ProjectButton>
										<ProjectButton
											onClick={() => this.props.willAddPost('image')}
											disabled={disabled}
										>
											Add Picture
										</ProjectButton>
									</ButtonContainer>
								) : this.props.reviewId ? (
									<ReviewButton
										onClick={() => this.props.showReviewModal(true)}
										disabled={this.props.gettingReviewId}
									>
										View Your Review
									</ReviewButton>
								) : (
									<ReviewButton
										onClick={() =>
											this.props.userInfo.user_id

												? this.props.showReviewModal('new')

												: this.notLoggedInHandler()
										}
										disabled={this.props.gettingReviewId}
									>
										Review Project
									</ReviewButton>
								))}


							{this.props.reviewModal &&
								(this.props.reviewId ? (
									<ReviewModal review_id={this.props.reviewId} />
								) : (
									<ReviewModal
										project_id={this.props.project.project_id}
										project_name={this.props.project.project_name}
										maker_name={this.props.project.username}
										img_url={this.props.project.img_url}
									/>
								))}

							{this.state.confirm && (
								<ConfirmModal confirm={this.state.confirm} />
							)}
						</ProjectContainer>
						<SideBarContainer />
					</ProjectPageContainer>
				</ProjectPageHeaderContainer>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		gettingUserInfo: state.loggedInReducer.gettingUserInfo,
		gettingUserInfoError: state.loggedInReducer.gettingUserInfoError,

		project: state.projectReducer.project,

		gettingProject: state.projectReducer.gettingProject,
		gettingProjectError: state.projectReducer.gettingProjectError,

		reviewId: state.reviewReducer.reviewId,

		gettingReviewId: state.reviewReducer.gettingReviewId,
		gettingReviewIdError: state.reviewReducer.gettingReviewIdError,

		projectToUpdate: state.projectReducer.projectToUpdate,

		postToAdd: state.postReducer.postToAdd,
		postToUpdate: state.postReducer.postToUpdate,
		postToDelete: state.postReducer.postToDelete,

		deletingProject: state.projectReducer.deletingProject,
		deletingProjectError: state.projectReducer.deletingProjectError,

		reviewModal: state.reviewReducer.reviewModal,

		redirect: state.projectReducer.redirect
	};
};

export default connect(
	mapStateToProps,
	{
		loggedIn,
		// loggedIn_Project_ReviewId_Chain,
		project_ReviewId_Chain,
		getProject,
		getReviewId,
		willUpdateProject,
		deleteProject,
		willAddPost,
		willUpdatePost,
		willDeletePost,
		showReviewModal,
		setRedirect
	}
)(ProjectPage);
