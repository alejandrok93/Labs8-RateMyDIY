// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalImage from 'react-modal-image';
import { Button } from 'reactstrap';
// Components
import { ConfirmModal } from '../../../components';

// Actions
import { deletePost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #E9DED8;
	width: 100%;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	margin: 8px 0;
`;

const ImgTextContainer = styled.div`
	background: #E9DED4;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const Img = styled(ModalImage)`
  margin: 0 auto;
	background: white;
  width: auto;
  height: auto;
`;

const ImgContainer = styled.div`
	padding-top: 12px;
  margin: auto;
	max-width: 700px;
	height: auto;
`;

const Text = styled.p`
	width: auto;
	padding: 16px 16px 8px 16px;
	font-size: 16px;
`;

const OptionsContainer = styled.div`
	display: flex;
	margin: 8px 0 0 auto;
	font-size: 11px;
	color: rgb(42, 43, 45);
`;

const EditLink = styled.a`
	margin-right: 8px;
`;

const DeleteLink = styled.a`
	margin-right: 8px;
`;

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
				<ImgTextContainer>
					{this.props.post.img_url && (

						<ImgContainer>
							<Img
								small={this.props.post.img_url}
								large={this.props.post.img_url}
								alt={this.props.post.img_url}
								hideZoom='true'
							/>
						</ImgContainer>
					)}
					{this.props.post.text && <Text>{this.props.post.text}
						{this.props.owner && (
							<OptionsContainer>
								<EditLink
									onClick={() => this.props.willUpdatePost(this.props.post.post_id)}
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
					</Text>}

					{this.props.postToDelete && this.props.deletingPost && (
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
