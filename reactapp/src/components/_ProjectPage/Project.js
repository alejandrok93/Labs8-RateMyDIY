// Dependencies
import React from 'react';

// Components
import { StarCount } from '../../components';

// Styles
import styled from 'styled-components';

const ProjectHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ProjectName = styled.h2``;

const ReviewsButton = styled.button``;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 380px;
	width: 100%;
	background: #cceeee;
	margin-bottom: 20px;
`;

const Text = styled.p`
	width: 100%;
	background: #cceeee;
	padding: 10px 10px;
	margin-bottom: 20px;
`;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const ProjectContainer = styled.div``;

const ProjectButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const Project = props => {
	return (
		<ProjectContainer>
			<ProjectHeader>
				<ProjectName>{props.project.project_name}</ProjectName>
				<StarCount rating={props.project.project_rating} />
				<ReviewsButton disabled={props.disabled}>Reviews</ReviewsButton>
			</ProjectHeader>
			<Img
				src={props.project.img_url}
				alt={props.project.img_url || 'project image'}
			/>
			<Text>{props.project.text}</Text>
			{props.owner && (
				<ProjectButtonContainer>
					<EditButton
						onClick={() => props.willUpdateProject(true)}
						disabled={props.disabled}
					>
						Edit Project
					</EditButton>
					<DeleteButton onClick={props.deleteHandler} disabled={props.disabled}>
						Delete Project
					</DeleteButton>
				</ProjectButtonContainer>
			)}
		</ProjectContainer>
	);
};

export default Project;
