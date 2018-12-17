// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// Components
import { ConfirmModal } from '../../components';
import UploadProjectPictureIcon from './circleplus.png';
import TextareaAutosize from 'react-autosize-textarea';
// Actions
import { updateProject, updateProjectImage } from '../../actions';

// Styles
import styled from 'styled-components';

class EditProject extends Component {
	state = {
		projectName: '',
		img_url: '',
		projectDescriptionText: '',
		categories: [],
		selectedFile: null,
		uploadingProjectImage: false
	};

	componentDidMount() {
		this.setState({
			projectName: this.props.project.project_name,
			img_url: this.props.project.img_url,
			projectDescriptionText: this.props.project.text,
			project_rating: this.props.project.project_rating
		});
		document.addEventListener("keydown", this.escCancelHandler, false);
	}

	// This stores the project image file recieved in the ReactFileReader form data  
	singleFileChangedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
		const data = new FormData();
		// If file selected
		if (this.state.selectedFile && !this.state.uploadingProjectImage) {
			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
			this.setState({
				uploadingProjectImage: true
			});
			axios
				.post(
					(process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
					`/api/projects/image-upload`,
					data,
					{
						onUploadProgress: progressEvent => {
							console.log(
								'Upload Progress:' +
								Math.round(
									(progressEvent.loaded / progressEvent.total) * 100
								) +
								'%'
							);
						}
					},
					{
						headers: {
							accept: 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data; boundary=${data._boundary}`
						}
					}
				)
				.then(response => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								// this.ocShowAlert("Max size: 2MB", "red");
								this.setState({
									uploadingProjectImage: false
								});
							} else {
								this.setState({
									uploadingProjectImage: false
								});
								console.log(response.data.location);
								// If not the given file type
								// this.ocShowAlert(response.data.error, "red");
								console.log(response.data.path);
							}
						} else {
							let photo = response.data.location;
							this.setState({
								img_url: photo,
								uploadingProjectImage: false
							}, () => { this.submitProjectChanges() });
						}
					} else {
						console.log('error');
					}
				})
				.catch(error => {
					// If another error
					console.log('error');
				});
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
		console.log(event.target.value)
	};

	// updates the project with the edited data
	submitProjectChanges = event => {
		if (this.props.selectedFile && !this.state.uploadingProjectImage) {
			this.singleFileUploadHandler(event);
		}
		this.props.updateProject(
			this.props.project.project_id,
			{
				user_id: this.props.user_id,
				projectName: this.state.project_name,
				img_url: this.state.img_url,
				projectDescriptionText: this.state.projectDescriptionText,
				categories: this.state.categories
			},
			() => this.props.willUpdateProject(false)
		);
	};

	// Discard changes (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (
			this.state.projectName === this.props.project.project_name &&
			this.state.img_url === this.props.project.img_url &&
			this.state.projectDescriptionText === this.props.project.text
		) {
			this.props.willUpdateProject(false);
			this.setState(prevState => ({ toggle: !prevState.toggle }));
		} else {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.willUpdateProject(false);
					}
				}
			});
		}
	};

	render() {
		return (
			<EditProjectFormContainer onSubmit={this.singleFileUploadHandler}>
				<ProjectHeader>
					<ProjectNameAndAuthorContainer>
						<ProjectName>
							<ProjectNameInput
								name="projectName"
								type="text"
								placeholder="Project Title"
								value={this.state.projectName}
								onChange={this.changeHandler}
								required
							/>
						</ProjectName>
						<ProjectAuthor>by user ID {this.props.project.user_id}</ProjectAuthor>
					</ProjectNameAndAuthorContainer>
				</ProjectHeader>
				<ImgContainer>
					<ProjectPictureHiddenInput
						type="file"
						id="project_picture_input"
						onChange={this.singleFileChangedHandler}
					/>
					<ProjectPictureUploadLabel
						htmlFor="project_picture_input"
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						<UploadProjectPictureIconStyle
							className="upload-icon"
							src={UploadProjectPictureIcon} />
					</ProjectPictureUploadLabel>
					<ProjectImage
						src={this.state.img_url}
						alt={this.state.img_url || 'project image'}
					/>
				</ImgContainer>
				{/* HiddenProfilePictureInput is hidden */}
				<DescriptionContainer>
					<DescriptionInput
						name="projectDescriptionText"
						type="text"
						placeholder="project description"
						value={this.state.projectDescriptionText}
						onChange={this.changeHandler}
						required
					/>
				</DescriptionContainer>
				<EditProjectOptionsContainer>
					<CancelLink
						onClick={this.cancelHandler}
						disabled={this.props.updatingProject || this.props.gettingProject}
						onKeyDown={this.escCancelHandler}
						tabIndex="0"
					>
						cancel
					</CancelLink>
					<SubmitLink
						type="submit"
						value="Submit Changes"
						disabled={this.props.updatingProject || this.props.gettingProject}
					>submit
					</SubmitLink>
				</EditProjectOptionsContainer>

				{(this.props.updatingProject || this.props.gettingProject || this.state.uploadingProjectImage) && (
					<StatusMessage small>Updating project...</StatusMessage>
				)}
				{this.props.updatingProjectError && (
					<StatusMessage small error>
						{this.props.updatingProjectError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</EditProjectFormContainer>
		);
	};
};

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,
		updatingProject: state.projectReducer.updatingProject,
		updatingProjectError: state.projectReducer.updatingProjectError
	};
};

export default connect(
	mapStateToProps,
	{
		updateProject, updateProjectImage
	}
)(EditProject);


// Styled-components
const EditProjectFormContainer = styled.form`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	border: 1px solid lightgray;
	margin: 0 0 18px 0;
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: row;
	padding: 18px 20px 10px 20px;
	justify-content: space-between;
  align-items: center;
`;

const ProjectNameAndAuthorContainer = styled.div`
	display: flex;
	min-width: 70%;
	flex-direction: column;
`;

const ProjectName = styled.h2`
	display: flex;
	margin: 0 0 0 -2px;
`;

const ProjectNameInput = styled.input`
	border: 0;
	margin: -3px 0 -4px 0;
	font-size: 32px;
	font-weight: bold;
`;

const ProjectAuthor = styled.div`
`;

const ProjectPictureHiddenInput = styled.input`
	opacity: 0;
  position: absolute;
  pointer-events: none;
  // alternative to pointer-events, compatible with all browsers, just make it impossible to find
  width: 1px;
  height: 1px;
`;

const ProjectPictureUploadLabel = styled.label`
	text-align: center;
`;

const ImgContainer = styled.div`
	position: relative;
	display: flex;
	height: auto;
	margin: 0 auto;
	max-height: 600px !important;
	width: auto;
	margin: 0 auto;
	transition: .5s ease;
	:hover {
		opacity: .9;
	}
`;

const UploadProjectPictureIconStyle = styled.img`
	position: absolute;
  top: 50%;
  left: 50%;
	height: 35%;
	opacity: .4;
  transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	margin: auto;
	padding: auto;
	transition: .5s ease;
	z-index: 1;
	:hover {
		opacity: .9;
	}
`;

const ProjectImage = styled.img`
	position: relative;
	height: 100%;
	width: 100%;
	transition: .5s ease;
`;

const DescriptionContainer = styled.div`
	width: auto;
	margin: 18px 20px 10px 20px;
	line-height: 18px;
	text-align: justify;
`;
const DescriptionInput = styled(TextareaAutosize)`
	width: 100%;
	border: none;
	padding: none;
	margin: -2px;
`;

const CancelLink = styled.a`
	cursor: pointer;
	margin-right: 8px;
	text-decoration: none;
	color: rgb(42,43,45);
	position: relative;
	z-index: 10;
	:hover {
		background: none;
		text-decoration: none;
		color: rgb(42,43,45);
	}
`;

const SubmitLink = styled.button`
	border: 0;
	margin: 0;
	padding: 0;
	background: none;
	cursor: pointer;
	color: rgb(42,43,45);
`;

// const ReviewsButton = styled.button``;



const EditProjectOptionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: -5px 20px 13px 20px;
	font-size: 11px;
	color: rgb(42, 43, 45);
	width: auto;
`;

const StatusMessage = styled.p``;