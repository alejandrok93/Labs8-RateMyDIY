// Dependencies
import React, { Component } from 'react';
import {
	getProject,
	addProject,
	updateProject,
	deleteProject,
	addPost,
	updatePost,
	deletePost
} from '../../actions';
import { connect } from 'react-redux';

// Components
import { Post, DeleteModal, ConfirmModal, StarCount } from '../../components';

// Styles
import styled from 'styled-components';

const ProjectPageContainer = styled.div`
	width: 700px;
	background: #ffeeee;
	padding: 30px;
	margin: 0 auto;
`;

const ProjectForm = styled.form``;

const TextInput = styled.input``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

const ImgUrlInput = styled.input``;

const ProjectHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ProjectName = styled.header``;

const ReviewsButton = styled.button``;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 380px;
	width: 100%;
	background: #cceeee;
	margin-bottom: 20px;
`;

const Text = styled.p`
	width: 100%;
	background: #cceeee;
	padding: 10px 10px;
	margin-bottom: 20px;
`;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const ProjectNameInput = styled.input``;

const Project = styled.div``;

const StatusMessage = styled.p``;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 20px;
`;

const OtherButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const ProjectButton = styled.button``;

const ReviewButton = styled.button``;

class ProjectPage extends Component {
	state = {};

	// Add editProject, newText, newImage, editPost, deleteProject, deletePost, or cancel to the state. This has various effects on what gets rendered below.
	clickHandler = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: true
		});

		// If we're editing the project, add it to the state.
		if (this.state.editProject) {
			this.setState({
				project_name: this.props.project.project_name,
				text: this.props.project.text,
				img_url: this.props.project.img_url
			});
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	
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
	componentDidMount() {
		if (this.props.match.params.id === 'new') {
			this.setState({
				newProject: true,
				project_name: '',
				text: '',
				img_url: ''
			});
		} else {
			this.props.getProject(this.props.match.params.id);
		}
	}

	render() {
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
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.clickHandler}
						/>
						<SubmitInput type="submit" value="Update Project" />
					</ProjectForm>
				) : (
					<Project>
						{this.props.gettingProject ? (
							<React.Fragment>
								<StatusMessage>Loading project...</StatusMessage>
							</React.Fragment>
						) : this.props.updatingProject ? (
							<React.Fragment>
								<StatusMessage>Updating project...</StatusMessage>
							</React.Fragment>
						) : this.props.error ? (
							<React.Fragment>
								<StatusMessage>Failed to load project</StatusMessage>
								<StatusMessage error>{this.props.error}</StatusMessage>
							</React.Fragment>
						) : (
							<React.Fragment>
								<ProjectHeader>
									<ProjectName>{this.props.project.project_name}</ProjectName>
									<StarCount rating={this.props.project.project_rating} />
									<ReviewsButton disabled={this.state.disabled}>
										Reviews
									</ReviewsButton>
								</ProjectHeader>
								<Img
									src={this.props.project.img_url}
									alt={this.props.project.img_url || 'project image'}
								/>
								<Text>{this.props.project.text}</Text>
								{this.owner() && (
									<OtherButtonContainer>
										<EditButton disabled={this.state.disabled}>
											Edit Project
										</EditButton>
										<DeleteButton disabled={this.state.disabled}>
											Delete Project
										</DeleteButton>
									</OtherButtonContainer>
								)}
							</React.Fragment>
						)}
					</Project>
				)}

				{this.props.project.posts &&
					this.props.project.posts.map(post => (
						<Post
							key={post.post_id}
							post={post}
							owner={this.owner()}
							disabled={this.state.disabled}
						/>
					))}

				{this.state.newText && <Post key="new" newText />}
				{this.state.newImage && <Post key="new" newImage />}

				{this.owner() &&
					!this.state.newProject &&
					!this.state.newText &&
					!this.state.newImage &&
					!this.props.gettingProject &&
					!this.props.updatingProject &&
					!this.props.error && (
						<ButtonContainer>
							<ProjectButton disabled={this.state.disabled}>
								Add Text Field
							</ProjectButton>
							<ProjectButton disabled={this.state.disabled}>
								Add Picture
							</ProjectButton>
						</ButtonContainer>
					)}

				{this.owner() || <ReviewButton>Review Project</ReviewButton>}

				{this.state.cancel && <ConfirmModal />}
				{this.state.deleteProject && (
					<DeleteModal
						project_id={this.props.project.project_id}
						project_name={this.props.project.project_name}
					/>
				)}
				{this.state.deletePost && (
					// This needs to move to Post.js
					<DeleteModal post_id={this.props.post_id} />
				)}
			</ProjectPageContainer>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		userInfo: state.loggedInReducer.userInfo,

		project: state.projectReducer.project,
		gettingProject: state.projectReducer.gettingProject,
		updatingProject: state.projectReducer.updatingProject,
		error: state.projectReducer.error

		// redirect?
	};
};

export default connect(
	mapStateToProps,
	{
		getProject,
		addProject,
		updateProject,
		deleteProject,
		addPost,
		updatePost,
		deletePost
	}
)(ProjectPage);
