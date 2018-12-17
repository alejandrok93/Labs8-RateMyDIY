// Dependencies
import React from 'react';
import ModalImage from 'react-modal-image';
// import { Button } from 'reactstrap';
// Components
import StarRatings from 'react-star-ratings';

import { Link } from 'react-router-dom';

// Styles
import styled from 'styled-components';

const Project = props => {
	return (
		<ProjectContainer>
			<ProjectHeader>
				<ProjectNameAuthorCategoryContainer>
					<ProjectName>{props.project.project_name}</ProjectName>
					<ProjectAuthor>by user ID {props.project.user_id}</ProjectAuthor>
					<CategoryContainer>
						{props.project.categories &&
							// [
							// 	{ category_id: 1, category_name: 'Tech' },
							// 	{ category_id: 2, category_name: 'Home' },
							// 	{ category_id: 3, category_name: 'Cooking' }
							// ].map(({ category_id, category_name }) => (
							props.project.categories.map(({ category_id, category_name }) => (
								// Needs category search!
								<Category
									to={`/make/search/queries/for/categories/please/${category_id}`}
									key={category_id}
								>
									{category_name}
								</Category>
							))}
					</CategoryContainer>
				</ProjectNameAuthorCategoryContainer>

				<ProjectRatingAndReviewsContainer>
					{props.project.project_rating && (
						<ProjectRatingTool
							rating={Number(props.project.project_rating)}
							starRatedColor="black"
							starEmptyColor="#bfbfbf"
							starRatedColor="#cc0000"
							// changeRating={this.changeRating}
							starDimension="20px"
							starSpacing="5px"
							numberOfStars={5}
						/>
					)}
					<ReviewsLink to={`/project/${props.project.project_id}/reviews`}>
						Reviews
			</ReviewsLink>
				</ProjectRatingAndReviewsContainer>
			</ProjectHeader>

			<ImgContainer>
				<Img
					small={props.project.img_url}
					large={props.project.img_url}
					alt={props.project.project_name}
					src={props.project.img_url}
				/>
			</ImgContainer>
			<DescriptionContainer>
				{props.project.text}
				{props.owner && (
					<OptionsContainer>
						<EditLink
							onClick={() => props.willUpdateProject(true)}
							disabled={props.disabled}
						>
							edit
						</EditLink>
						<DeleteButton
							color="danger"
							onClick={props.deleteHandler}
							disabled={props.disabled}
						>
							delete
						</DeleteButton>
					</OptionsContainer>
				)}
			</DescriptionContainer>
		</ProjectContainer>
	);
};

export default Project;

// Styled-components
const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	border: 1px solid lightgray;
	margin: 0 0 30px 0;
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: row;
	padding: 18px 20px 0 20px;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 20px 0;
`;

const ProjectNameAuthorCategoryContainer = styled.div`
	display: flex;
	min-width: 70%;
	flex-direction: column;
`;

const ProjectName = styled.h2`
	display: flex;
	font-size: 32px;
	font-weight: bold;
	margin: 0 0 0 -2px;
`;

const ProjectAuthor = styled.div``;

const ProjectRatingAndReviewsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-self: flex-end;
	min-width: 140px;
	align-content: flex-end;
`;

const ReviewsLink = styled(Link)`
	margin: 8px 0 0 0;
	display: flex;
  align-self: flex-end;
	&:hover {
		text-decoration: none;
		background: none;
	}
`;

const CategoryContainer = styled.div`
	font-size: 1.6rem;
	margin: 12px 0 0;
	display: flex;
`;

const Category = styled(Link)`
	min-width: 54px;
	margin: 0 4px 0 0;
	text-align: center;
	letter-spacing: 0.05rem;
	color: white;
	background: #254f8d;
	padding: 4px 5px 2px;
	border-radius: 4px;
	font-size: 12px;
	&:hover {
		text-decoration: none;
		color: white;
		background: #1c293b;
	}
`;

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
`;

const ProjectRatingTool = styled(StarRatings)``;

const DescriptionContainer = styled.div`
	width: auto;
	margin: 18px 20px 4px 20px;
	line-height: 18px;
	/* text-align: justify; */
`;

const OptionsContainer = styled.div`
	display: flex;
	margin: 5px 0 0 0;
	font-size: 11px;
	color: rgb(42, 43, 45);
	width: auto;
	justify-content: flex-end;
`;

const EditLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 8px;
`;

const DeleteButton = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;
