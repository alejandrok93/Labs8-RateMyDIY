// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../components';

// Actions
import { addProject, setRedirect } from '../../actions';

// Styles
import styled from 'styled-components';

const NewProjectContainer = styled.div`
	width: 700px;
	background: #ffeeee;
	padding: 30px;
	margin: 0 auto;
`;

const StatusMessage = styled.p``;

const ProjectForm = styled.form`
	background: #ffcccc;
`;

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

const ProjectHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ProjectNameInput = styled.input``;

const ProjectButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

class NewProject extends Component {
	state = {
		project_name: '',
		img_url: '',
		text: ''
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit new project
	submitHandler = event => {
		event.preventDefault();

		this.props.addProject({
			user_id: this.props.userInfo.user_id,
			project_name: this.state.project_name,
			img_url: this.state.img_url,
			text: this.state.text
		});
	};

	// Cancel new project (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (this.state.project_name || this.state.img_url || this.state.text) {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.setRedirect('/');
					}
				}
			});
		} else {
			this.props.setRedirect('/');
		}
	};

	componentWillUnmount() {
		this.props.setRedirect(null);
	}

	render() {
		if (this.props.redirect) {
			return <Redirect push to={this.props.redirect} />;
		} else {
			return (
				<NewProjectContainer>
					<ProjectForm onSubmit={this.submitHandler}>
						<ProjectHeader>
							<ProjectNameInput
								name="project_name"
								type="text"
								placeholder="project title"
								value={this.state.project_name}
								onChange={this.changeHandler}
								autoFocus
								required
							/>
						</ProjectHeader>
						<Img
							src={this.state.img_url || 'placeholder image'}
							alt={this.state.img_url || 'placeholder image'}
						/>
						<ImgUrlInput
							// todo: upload to aws
							name="img_url"
							type="text"
							placeholder="picture of finished project"
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
						<ProjectButtonContainer>
							<CancelButton onClick={this.cancelHandler}>Cancel</CancelButton>
							<SubmitInput type="submit" value="Add New Project" />
						</ProjectButtonContainer>
						{this.props.addingProject && (
							<StatusMessage small>Adding new project...</StatusMessage>
						)}
						{this.props.addingProjectError && (
							<StatusMessage small error>
								{this.props.addingProjectError}
							</StatusMessage>
						)}
					</ProjectForm>

					{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				</NewProjectContainer>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		addingProject: state.projectReducer.addingProject,
		addingProjectError: state.projectReducer.addingProjectError,

		redirect: state.projectReducer.redirect
	};
};

export default connect(
	mapStateToProps,
	{
		addProject,
		setRedirect
	}
)(NewProject);
