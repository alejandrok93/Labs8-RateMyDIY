// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { addPost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
	background: #ffcccc;
`;

const PostForm = styled.form``;

const TextInput = styled.input``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

const ImgUrlInput = styled.input``;

const PostButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;

class NewPost extends Component {
	state = {
		img_url: '',
		text: ''
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit new post
	submitHandler = event => {
		event.preventDefault();

		this.props.addPost({
			user_id: this.props.user_id,
			project_id: this.props.project_id,
			img_url: this.state.img_url,
			text: this.state.text
		});
	};

	// Cancel new post (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (this.state.img_url || this.state.text) {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.willAddPost(false);
					}
				}
			});
		} else {
			this.props.willAddPost(false);
		}
	};

	render() {
		return (
			<PostContainer>
				{/* I can probably combine these */}
				{this.props.postType === 'text' ? (
					<PostForm onSubmit={this.submitHandler}>
						<p>You can add an image to this post at a later time</p>
						<TextInput
							name="text"
							type="text"
							placeholder="new text field"
							value={this.state.text}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<PostButtonContainer>
							<CancelButton onClick={this.cancelHandler}>Cancel</CancelButton>
							<SubmitInput type="submit" value="Add Text Field" />
						</PostButtonContainer>
					</PostForm>
				) : (
					<PostForm onSubmit={this.submitHandler}>
						<ImgUrlInput
							// todo: upload to aws
							name="img_url"
							type="text"
							placeholder="new image url"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="optional text description"
							value={this.state.text}
							onChange={this.changeHandler}
						/>
						<PostButtonContainer>
							<CancelButton onClick={this.cancelHandler}>Cancel</CancelButton>
							<SubmitInput type="submit" value="Add Picture" />
						</PostButtonContainer>
					</PostForm>
				)}
				{this.props.addingPost && (
					<StatusMessage small>Adding new post...</StatusMessage>
				)}
				{this.props.addingPostError && (
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
		addingPost: state.postReducer.addingPost,
		addingPostError: state.postReducer.addingPostError
	};
};

export default connect(
	mapStateToProps,
	{
		addPost
	}
)(NewPost);
