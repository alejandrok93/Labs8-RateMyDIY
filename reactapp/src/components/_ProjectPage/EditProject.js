// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { StarCount, ConfirmModal } from '../../components';

// Actions
import { updateProject } from '../../actions';

// Styles
import styled from 'styled-components';

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

const ReviewsButton = styled.button``;

const ProjectNameInput = styled.input``;

const ProjectButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;

class EditProject extends Component {
	state = {
		project_name: '',
		img_url: '',
		text: ''
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit changes
	submitHandler = event => {
		event.preventDefault();

		this.props.updateProject(this.props.project.project_id, {
			user_id: this.props.user_id,
			project_name: this.state.project_name,
			img_url: this.state.img_url,
			text: this.state.text
		});
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

	componentDidMount() {
		this.setState({
			project_name: this.props.project.project_name,
			img_url: this.props.project.img_url,
			text: this.props.project.text
		});
	}

	render() {
		return (
			<ProjectForm onSubmit={this.submitHandler}>
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
					<ReviewsButton disabled>Reviews</ReviewsButton>
				</ProjectHeader>
				<Img
					src={this.props.project.img_url}
					alt={this.props.project.img_url || 'project image'}
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
					<SubmitInput type="submit" value="Submit Changes" />
				</ProjectButtonContainer>

				{this.props.updatingProject && (
					<StatusMessage small>Updating project...</StatusMessage>
				)}
				{this.props.gettingProject && (
					<StatusMessage small>Success!</StatusMessage>
				)}
				{this.props.updatingProjectError && (
					<StatusMessage small error>
						{this.props.updatingProjectError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</ProjectForm>
		);
	}
}

const mapStateToProps = state => {
	return {
		updatingProject: state.projectReducer.updatingProject,
		updatingProjectError: state.projectReducer.updatingProjectError,

		gettingProject: state.projectReducer.gettingProject
	};
};

export default connect(
	mapStateToProps,
	{
		updateProject
	}
)(EditProject);
