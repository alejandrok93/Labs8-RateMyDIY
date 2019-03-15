// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextareaAutosize from 'react-autosize-textarea';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { updatePost } from '../../../actions';

// Styles
import styled from 'styled-components';

class EditPost extends Component {
	state = {
		img_url: null,
		text: ''
	};

	singleFileChangedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
		const data = new FormData();
		// If file selected
		if (this.state.selectedFile) {
			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
			axios
				.post(
					(process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
						`/api/projects/image-upload`,
					data,
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
							} else {
								console.log(response.data.location);
								// If not the given file type
								// this.ocShowAlert(response.data.error, "red");
							}
						} else {
							// Success
							let fileName = response.data;

							let photo = response.data.location;
							this.setState({
								img_url: photo
							});
							console.log('filedata', fileName);

							console.log('photo', photo);

							//   this.ocShowAlert("File Uploaded", "#3089cf");
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
	};

	// Submit new post
	submitHandler = event => {
		event.preventDefault();

		this.props.updatePost(
			this.props.post.post_id,
			{
				user_id: this.props.user_id,
				project_id: this.props.project_id,
				img_url: this.state.img_url,
				text: this.state.text
			},
			() => this.props.willUpdatePost(false)
		);
	};

	// Discard changes (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (
			this.state.img_url === this.props.post.img_url &&
			this.state.text === this.props.post.text
		) {
			this.props.willUpdatePost(false);
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
						this.props.willUpdatePost(false);
					}
				}
			});
		}
	};

	componentDidMount() {
		this.setState({
			img_url: this.props.post.img_url,
			text: this.props.post.text
		});
	}

	render() {
		return (
			<PostContainer>
				<PostForm onSubmit={this.submitHandler}>
					{this.props.post.img_url && (
						<ImgContainer>
							<Img
								src={this.props.post.img_url}
								alt={this.props.post.img_url || 'project image'}
							/>
						</ImgContainer>
					)}
					<form>
						<input
							type="file"
							onChange={this.singleFileChangedHandler}
							disabled={this.props.updatingPost || this.props.gettingProject}
						/>
						<div className="mt-5">
							<button
								className="btn btn-info"
								onClick={this.singleFileUploadHandler}
								disabled={this.props.updatingPost || this.props.gettingProject}
							>
								Upload!
							</button>
						</div>
					</form>
					<TextInput
						name="text"
						type="text"
						placeholder="optional text description"
						value={this.state.text}
						onChange={this.changeHandler}
						autoFocus
						required={!this.state.img_url}
					/>
					<PostButtonContainer>
						<CancelButton
							onClick={this.cancelHandler}
							disabled={this.props.updatingPost || this.props.gettingProject}
						>
							cancel
						</CancelButton>
						<SubmitInput
							type="submit"
							value="submit"
							disabled={this.props.updatingPost || this.props.gettingProject}
						/>
					</PostButtonContainer>
				</PostForm>

				{(this.props.updatingPost || this.props.gettingProject) && (
					<StatusMessage small>Updating post...</StatusMessage>
				)}
				{this.props.updatingPostError && (
					<StatusMessage small error>
						{this.props.addingPostError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</PostContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,

		updatingPost: state.postReducer.updatingPost,
		updatingPostError: state.postReducer.updatingPostError
	};
};

export default connect(
	mapStateToProps,
	{
		updatePost
	}
)(EditPost);

// Styles
const PostContainer = styled.form`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	background: #cbd6e7;
	border: 1px solid lightgray;
	padding: 18px 20px;
	margin: 0 0 30px 0;
`;

const PostForm = styled.form``;

const ImgContainer = styled.div`
	padding-top: 12px;
	margin: auto;
	max-width: 100%;
	height: auto;
`;

const Img = styled.img`
	margin: 0 auto;
	background: white;
	max-width: 100%;
	height: auto;
`;

const TextInput = styled(TextareaAutosize)`
	width: 100%;
	min-height: 4rem;
	background: #eef1f7;
	line-height: 1.6rem;
	border: none;
	padding: none;
	margin: -2px;
`;

const PostButtonContainer = styled.div`
	display: flex;
	margin: 8px 0 -6px 0;
	font-size: 1.4rem;
	width: auto;
	justify-content: flex-end;
`;

const CancelButton = styled.a`
	cursor: pointer;
	margin-right: 12px;
	text-decoration: none;
	color: black;
	position: relative;
	z-index: 10;
	:hover {
		background: none;
		text-decoration: none;
		color: #33393f;
	}
`;

const SubmitInput = styled.input`
	border: 0;
	margin: 0;
	padding: 0;
	background: none;
	cursor: pointer;
	color: black;
	:hover {
		background: none;
		text-decoration: none;
		color: #33393f;
	}
`;

const StatusMessage = styled.p``;
