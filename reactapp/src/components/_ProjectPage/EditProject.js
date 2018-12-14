// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import { ConfirmModal } from '../../components';
import StarRatings from 'react-star-ratings';
import UploadProjectPictureIcon from './circleplus.png';
import TextareaAutosize from 'react-autosize-textarea';
// Actions
import { updateProject, updateProjectImage } from '../../actions';

// Styles
import styled from 'styled-components';

class EditProject extends Component {
	state = {
		project_name: '',
		img_url: '',
		text: '',
		categories: [],
		selectedFile: null,
		// file: null
	};

	// This stores the project image file recieved in the ReactFileReader form data  
	projectImageSelector = (event) => {
		const file = URL.createObjectURL(event.target.files[0])
		this.setState(() => ({ img_url: file }))
	};

	projectImageUploader = event => {
		event.preventDefault();

		// If file selected
		if (this.state.selectedFile) {

			const data = new FormData();

			const headerData = {
				headers: {
					accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`
				}
			}

			console.log("FILE SELECTED " + this.state.selectedFile);

			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);

			this.props.updateProjectImage(data, headerData, value => this.setState({ img_url: value }))
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit changes
	submitProjectChanges = event => {
		event.preventDefault();
		this.props.updateProject(
			this.props.project.project_id,
			{
				user_id: this.props.user_id,
				project_name: this.state.project_name,
				img_url: this.state.img_url,
				text: this.state.text,
				categories: this.state.categories
			},
			() => this.props.willUpdateProject(false)
		);
	};

	// Discard changes (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (
			this.state.project_name === this.props.project.project_name &&
			this.state.img_url === this.props.project.img_url &&
			this.state.text === this.props.project.text
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
	escCancelHandler = (event) => {
		if (event.keyCode === 27) {
			this.cancelHandler(event);
		}
	}
	componentDidMount() {
		this.setState({
			project_name: this.props.project.project_name,
			img_url: this.props.project.img_url,
			text: this.props.project.text,
			project_rating: this.props.project.project_rating
		});
		document.addEventListener("keydown", this.escCancelHandler, false);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escCancelHandler, false);
	}

	render() {
		return (
			<EditProjectFormContainer onSubmit={this.submitProjectChanges}>
				<ProjectHeader>
					<ProjectNameAndAuthorContainer>
						<ProjectName>
							<ProjectNameInput
								name="project_name_input"
								type="text"
								placeholder="Project Title"
								value={this.state.project_name}
								onChange={this.changeHandler}
								required
							/>
						</ProjectName>
						<ProjectAuthor>by user ID {this.props.project.user_id}</ProjectAuthor>
					</ProjectNameAndAuthorContainer>
					<UploadImageButtonTemp
						className="btn btn-info"
						onClick={this.projectImageUploader}
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						Upload Image (temp)
						</UploadImageButtonTemp>
				</ProjectHeader>
				<ImgContainer>
					<ProjectPictureHiddenInput
						type="file"
						id="project_picture_input"
						onChange={this.projectImageSelector}
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
						name="text"
						type="text"
						placeholder="project description"
						value={this.state.text}
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

				{(this.props.updatingProject || this.props.gettingProject) && (
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
	:hover {
		opacity: .9;
	}
	z-index: 1;
`;

const ProjectImage = styled.img`
	position: relative;
	height: 100%;
	width: 100%;
	transition: .5s ease;
`;

const UploadImageButtonTemp = styled.button`
	display: flex;
	width: auto;
	margin: 5px;
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
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 8px;
	text-decoration: none;
	color: rgb(42,43,45);
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