import React from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

//Apply styles
const SearchWrapper = styled.div`
	width: 80%;
	height: 100px;
	margin: 25px auto;
	display: flex;
	flex-direction: column;
`;

const SelectWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;

const SelectStyle = styled.select`
	height: 24px;
	width: 20%;
	transform: 1s;
	/* border-radius: 5px; */
`;

const SearchBarWrapper = styled.form`
	display: flex;
	width: 100%;
	height: 35px;
	align-items: baseline;
`;
const SearchBarSearchButtonWrapper = styled.div`
	display: flex;
	height: 100px;
	align-items: flex-end;
`;
const SearchBarInput = styled.input`
	width: 100%;
	height: 35px;
	color: black;
	outline: none;
	border: 2px solid black;
	border-radius: 5px;
	font-size: 14px;
`;

const SearchBarButton = styled.button`
	width: 80px;
	height: 25px;
	margin: 0px 15px;
	background: 0;
	border: none;
	border: 2px solid black;
	box-shadow: 5px 5px 0px;
`;

const SearchBar = props => {
	return (
		<SearchWrapper>
			<SelectWrapper>
				<SelectStyle name="Maker" id="maker">
					{/* Need to poll DB for list of makers */}
					<option value="">Maker</option>
					<option value="">Maker</option>
					<option value="">Maker</option>
					<option value="">Maker</option>
				</SelectStyle>
				<SelectStyle name="Reviewer" id="reviewer">
					<option value="">Reviewer</option>
					<option value="">Reviewer</option>
					<option value="">Reviewer</option>
					<option value="">Reviewer</option>
				</SelectStyle>
				<SelectStyle name="Category" id="category">
					<option value="">Category</option>
					<option value="">Category</option>
					<option value="">Category</option>
					<option value="">Category</option>
				</SelectStyle>
				<SelectStyle name="Stars" id="stars">
					<option value="">Stars</option>
					<option value="">Stars</option>
					<option value="">Stars</option>
					<option value="">Stars</option>
				</SelectStyle>
			</SelectWrapper>
			<SearchBarSearchButtonWrapper>
				<SearchBarWrapper>
					<SearchBarInput
						onChange={e => props.handleChange(e)}
						placeholder="Find a DIY project"
					/>
					<SearchBarButton
						onClick={e => props.handleSearch(e)}
						className="search-button"
					>
						Search
					</SearchBarButton>
				</SearchBarWrapper>
			</SearchBarSearchButtonWrapper>
		</SearchWrapper>
	);
};

export default SearchBar;
