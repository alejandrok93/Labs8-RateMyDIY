import React from 'react';
import styled from 'styled-components';

import { SearchBar, Nav } from '../index';

const HeaderContainer = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;
	position: fixed;

	background-color: yellow;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;

	margin: 0 20px;
`;

const Header = props => {
	return (
		<HeaderContainer>
			<img src="" alt="LOGO" />
			<HeaderSearchContainer>
				<SearchBar
					handleChange={props.handleChange}
					handleSearch={props.handleSearch}
				/>
			</HeaderSearchContainer>
			<Nav />
		</HeaderContainer>
	);
};

export default Header;
