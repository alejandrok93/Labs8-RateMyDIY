// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { deletePost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div``;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 380px;
	width: 100%;
	background: lightblue;
	margin-bottom: 20px;
`;

const Text = styled.p`
	width: 100%;
	background: lightblue;
	padding: 10px 10px;
	margin-bottom: 20px;
`;

const OtherButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const StatusMessage = styled.p``;

class Post extends Component {
	state = {};

	// Delete post (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.setState({
			confirm: {
				text: ['Are you sure? This cannot be undone.', 'Cancel', 'Delete Post'],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();

					this.props.deletePost(
						this.props.post.post_id,
						this.props.post.project_id,
						this.props.user_id
					);
					this.props.willDeletePost(this.props.post.post_id);

					this.setState({ confirm: undefined });
				}
			}
		});
	};

	render() {
		return (
			<PostContainer>
				{this.props.post.img_url && (
					<Img src={this.props.post.img_url} alt={this.props.post.img_url} />
				)}
				{this.props.post.text && <Text>{this.props.post.text}</Text>}
				{this.props.owner && (
					<OtherButtonContainer>
						<EditButton
							onClick={() => this.props.willUpdatePost(this.props.post.post_id)}
							disabled={this.props.disabled}
						>
							Edit Post
						</EditButton>
						<DeleteButton
							onClick={this.deleteHandler}
							disabled={this.props.disabled}
						>
							Delete Post
						</DeleteButton>
					</OtherButtonContainer>
				)}

				{this.props.postToDelete && this.props.deletingPost && (
					<StatusMessage small>Deleting post...</StatusMessage>
				)}
				{this.props.postToDelete && this.props.deletingPostError && (
					<StatusMessage small error>
						{this.props.deletingPostError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</PostContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		deletingPost: state.postReducer.deletingPost,
		deletingPostError: state.postReducer.deletingPostError
	};
};

export default connect(
	mapStateToProps,
	{
		deletePost
	}
)(Post);
