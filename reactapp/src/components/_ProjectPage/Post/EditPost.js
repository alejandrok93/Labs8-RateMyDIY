// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { updatePost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
	background: #ffcccc;
`;

const PostForm = styled.form``;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 380px;
	width: 100%;
	background: #cceeee;
	margin-bottom: 20px;
`;

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

class EditPost extends Component {
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

		this.props.updatePost(this.props.post.post_id, {
			user_id: this.props.user_id,
			project_id: this.props.project_id,
			img_url: this.state.img_url,
			text: this.state.text
		});
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
						<Img
							src={this.props.post.img_url}
							alt={this.props.post.img_url || 'project image'}
						/>
					)}
					<ImgUrlInput
						// todo: upload to aws
						name="img_url"
						type="text"
						placeholder="new image url"
						value={this.state.img_url}
						onChange={this.changeHandler}
						required={!this.state.text}
					/>
					<TextInput
						name="text"
						type="text"
						placeholder="optional text description"
						value={this.state.text}
						onChange={this.changeHandler}
						required={!this.state.img_url}
					/>
					<PostButtonContainer>
						<CancelButton onClick={this.cancelHandler}>Cancel</CancelButton>
						<SubmitInput type="submit" value="Submit Changes" />
					</PostButtonContainer>
				</PostForm>

				{this.props.updatingPost && (
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
