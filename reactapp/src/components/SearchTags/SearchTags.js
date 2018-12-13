import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	display: flex;
	margin: 25px;
	margin-left: 33%;

	@media (max-width: 500px) {
		justify-content: center;
		margin: 25 auto;
		margin-left: auto;
	}
`;

const SuggestedCategories = styled(Link)`
	font-size: 14px;
	color: white;
	margin: 0 3px;

	&:hover {
		background-color: transparent;
		color: white;
		text-decoration: underline;
	}
`;

const SearchTags = props => {
	return (
		<Container>
			<span>Suggested:</span>{' '}
			{props.tags.map((tag, index) => (
				<SuggestedCategories to={`/search?query=${tag}`} key={tag}>
					{tag}
					{props.tags.length > index + 1 ? ', ' : ''}
				</SuggestedCategories>
			))}
		</Container>
	);
};

export default SearchTags;
