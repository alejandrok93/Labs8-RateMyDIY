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
	ConfirmModal
} from '../../components';

// Actions
import {
	getProject,
	willUpdateProject,
	deleteProject,
	willAddPost,
	willUpdatePost,
	willDeletePost
} from '../../actions';

// Styles
import styled from 'styled-components';

const ProjectPageContainer = styled.div`
	width: 700px;
	background: #ffeeee;
	padding: 30px;
	margin: 0 auto;
`;

const StatusMessage = styled.p``;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 20px;
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
<<<<<<< HEAD
	
	// Returns true if user is author
	owner = () => this.props.project.user_id === this.props.userInfo.user_id;
	// owner = () => true;

	// Disable other buttons when there is an active form
	disabled = () =>
		!this.state.editProject ||
		!this.state.editPost ||
		!this.state.newText ||
		!this.state.newImage;

	// If this is a new project, set up the state with an empty form.
=======

>>>>>>> dev
	componentDidMount() {
		this.props.getProject(this.props.match.params.id);
	}

	render() {
<<<<<<< HEAD
		return (
			<ProjectPageContainer>
				{this.state.newProject ? (
					<ProjectForm>
						<ProjectHeader>
							<ProjectNameInput
								name="project_name"
								type="text"
								placeholder="project title"
								value={this.state.project_name}
								onChange={this.changeHandler}
								required
							/>
						</ProjectHeader>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="file"
							placeholder="image url for finished project"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="project description"
							value={this.state.text}
							onChange={this.changeHandler}
							required
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.clickHandler}
						/>
						<SubmitInput type="submit" value="Add New Project" />
					</ProjectForm>
				) : this.state.editProject ? (
					<ProjectForm>
						<ProjectHeader>
							<ProjectNameInput
								name="project_name"
								type="text"
								placeholder="project title"
								value={this.state.project_name}
								onChange={this.changeHandler}
								required
							/>
							<StarCount rating={this.props.project.rating} />
							<ReviewsButton disabled />
						</ProjectHeader>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="text"
							placeholder="image url for finished project"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="project description"
							value={this.state.text}
							onChange={this.changeHandler}
							required
=======
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
				<ProjectPageContainer>
					{/* Might be a good idea to replace these with a switch */}
					{this.props.projectToUpdate ? (
						<EditProject
							user_id={this.props.userInfo.user_id}
							project={this.props.project}
							willUpdateProject={this.props.willUpdateProject}
>>>>>>> dev
						/>
					) : this.props.gettingProject ? (
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
					{!this.props.gettingProject &&
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
						) : (
							<ReviewButton>Review Project</ReviewButton>
						))}

					{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				</ProjectPageContainer>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		project: state.projectReducer.project,

		gettingProject: state.projectReducer.gettingProject,
		gettingProjectError: state.projectReducer.gettingProjectError,

		projectToUpdate: state.projectReducer.projectToUpdate,

		postToAdd: state.postReducer.postToAdd,
		postToUpdate: state.postReducer.postToUpdate,
		postToDelete: state.postReducer.postToDelete,

		deletingProject: state.projectReducer.deletingProject,
		deletingProjectError: state.projectReducer.deletingProjectError,

		redirect: state.projectReducer.redirect
	};
};

export default connect(
	mapStateToProps,
	{
		getProject,
		willUpdateProject,
		deleteProject,
		willAddPost,
		willUpdatePost,
		willDeletePost
	}
)(ProjectPage);
