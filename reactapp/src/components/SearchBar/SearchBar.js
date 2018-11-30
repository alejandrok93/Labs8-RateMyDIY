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

	@media (max-width: 500px) {
		width: 100%;
	}
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

	@media (max-width: 500px) {
		text-align-last: center;
		padding-left: 10px;
	}
`;

const SearchBarWrapper = styled.form`
	display: flex;
	width: 100%;
	height: 35px;
	align-items: baseline;

	@media (max-width: 500px) {
		position: relative;
	}
`;
const SearchBarSearchButtonWrapper = styled.div`
	display: flex;
	height: 100px;
	align-items: flex-end;

	@media (max-width: 500px) {
		position: relative;
	}
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

	@media (max-width: 500px) {
		position: absolute;
		right: 0;
		margin: 5px 0px 0px 0px;
		text-align: right;
		border: none;
		box-shadow: none;
		z-index: 1;
	}
`;

const SearchBar = props => {
	return (
		<SearchWrapper>
			<SelectWrapper>
				<SelectStyle name="Maker" id="maker">
					{/* Need to poll DB for list of makers */}
					<option value="">Maker</option>
					<option value="">Reviewer</option>
					<option value="">Category</option>
					<option value="">Stars</option>
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
						placeholder="Find a DIY project or Author"
					/>
					<SearchBarButton
						onClick={e => props.handleSearch(e)}
						className="search-button"
					>
						{window.innerWidth <= 500 ? (
							<img
								src="https://cdn4.iconfinder.com/data/icons/kripto-black-2/512/kripto-search-b.png"
								alt=""
								style={{ width: '20px', height: '20px' }}
							/>
						) : (
							'Search'
						)}
					</SearchBarButton>
				</SearchBarWrapper>
			</SearchBarSearchButtonWrapper>
		</SearchWrapper>
	);
};

export default SearchBar;
