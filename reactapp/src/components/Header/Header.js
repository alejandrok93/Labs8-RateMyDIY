import React from 'react';
import styled from 'styled-components';

import { SearchBar, Nav } from '../index';

const HeaderContainer = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;
	position: fixed;
	background-color: #232a34;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;

	margin: 0 20px;
`;

const Header = props => {
	return (
		<HeaderContainer>
			<a href="/">
				<img
					style={{ width: '60px', height: '60px', margin: '0 20px' }}
					src="https://ratemydiy.s3.amazonaws.com/1543872216210"
					alt="LOGO"
				/>
			</a>
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
