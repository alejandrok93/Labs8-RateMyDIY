import React from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown
} from 'reactstrap';

//Apply styles
const SearchWrapper = styled.div`
	width: 80%;
	height: 25px;
	margin: 15px auto;
	display: flex;
	flex-direction: column;
`;

const SelectWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;

const SelectStyle = styled.div`
	height: 24px;
	width: 20%;
	transform: 1s;
	/* border-radius: 5px; */
`;

// const SearchBarWrapper = styled.form`
//   display: flex;
//   width: 100%;
//   height: 35px;
//   align-items: baseline;
// `;
// const SearchBarSearchButtonWrapper = styled.div`
//   display: flex;
//   height: 100px;
//   align-items: flex-end;
// `;
// const SearchBarInput = styled.input`
//   width: 100%;
//   height: 35px;
//   color: black;
//   outline: none;
//   border: 2px solid black;
//   border-radius: 5px;
//   font-size: 14px;
// `;

// const SearchBarButton = styled.button`
//   width: 80px;
//   height: 25px;
//   margin: 0px 15px;
//   background: 0;
//   border: none;
//   border: 2px solid black;
//   box-shadow: 5px 5px 0px;
// `;

export default class SearchPageSearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
	//

	render() {
		return (
			<SearchWrapper>
				<SelectWrapper>
					<h1>Filter by</h1>
					<SelectStyle name="Category" id="category">
						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							<DropdownToggle caret>Categories</DropdownToggle>
							<DropdownMenu>
								<DropdownItem
									onClick={e => this.props.handleFilterCategoryTech(e)}
								>
									Tech
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem
									onClick={e => this.props.handleFilterCategoryFood(e)}
								>
									Food
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem
									onClick={e => this.props.handleFilterCategoryHome(e)}
								>
									Home
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SelectStyle>
					<h1>Sort by</h1>
					<SelectStyle name="Stars" id="stars">
						<UncontrolledDropdown>
							<DropdownToggle caret>Sort By</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>Rating Up</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Rating Down</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Date of Review</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</SelectStyle>
				</SelectWrapper>
			</SearchWrapper>
		);
	}
}
