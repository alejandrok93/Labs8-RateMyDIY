// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalImage from 'react-modal-image';
// import { Button } from 'reactstrap';
// Components
import { ConfirmModal } from '../../../components';

// Actions
import { deletePost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	border: 1px solid lightgray;
	padding: 0 0 5px;
	margin: 0 0 30px;
`;

const ImgTextContainer = styled.div``;

const ImgContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	max-height: 600px;
	width: auto;
`;

const Img = styled(ModalImage)`
	margin: 0 auto;
	background: white;
	width: 100%;
	min-height: 300px;
	object-fit: contain;
	border-radius: 4px 4px 0 0;
`;

const Text = styled.p`
	width: auto;
	margin: 18px 20px 5px 20px;
	line-height: 18px;
	text-align: justify;
`;

const OptionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 0 20px 10px 20px;
	font-size: 11px;
	color: rgb(42, 43, 45);
	width: auto;
`;

const EditLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 8px;
`;

const DeleteLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;

const StatusMessage = styled.p``;

class Post extends Component {
	state = {};

	// Delete post (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.props.willDeletePost(this.props.post.post_id);

		this.setState({
			confirm: {
				text: ['Are you sure? This cannot be undone.', 'Cancel', 'Delete Post'],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
					this.props.willDeletePost(false);
				},
				submit: event => {
					event.preventDefault();

					this.props.deletePost(
						this.props.post.post_id,
						this.props.project_id,
						this.props.user_id,
						() => this.props.willDeletePost(false)
					);

					this.setState({ confirm: undefined });
				}
			}
		});
	};

	render() {
		return (
			<PostContainer>
				<ImgTextContainer>
					{this.props.post.img_url && (
						<ImgContainer>
							<Img
								small={this.props.post.img_url}
								large={this.props.post.img_url}
								alt={this.props.post.img_url}
								hideZoom="true"
							/>
						</ImgContainer>
					)}
					{this.props.post.text && <Text>{this.props.post.text}</Text>}
					{this.props.owner && (
						<OptionsContainer>
							<EditLink
								onClick={() =>
									this.props.willUpdatePost(this.props.post.post_id)
								}
								disabled={this.props.disabled}
							>
								edit
							</EditLink>
							<DeleteLink
								onClick={this.deleteHandler}
								disabled={this.props.disabled}
							>
								delete
							</DeleteLink>
						</OptionsContainer>
					)}

					{this.props.postToDelete &&
						(this.props.deletingPost || this.props.gettingProject) && (
							<StatusMessage small>Deleting post...</StatusMessage>
						)}
					{this.props.postToDelete && this.props.deletingPostError && (
						<StatusMessage small error>
							{this.props.deletingPostError}
						</StatusMessage>
					)}

					{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				</ImgTextContainer>
			</PostContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,

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
