import React from 'react';
import styled from 'styled-components';


import { SearchBar, Nav } from '../index';

const HeaderContainer = styled.div`
	width: 100%;
	z-index: 999;
	position: fixed;
	background-color: #232a34;
`;

const HeaderContainerWraper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;

	margin: 0 20px;
`;

const Header = props => {
	return (
		<HeaderContainer>
			<HeaderContainerWraper>
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
			</HeaderContainerWraper>
		</HeaderContainer>
	);
};

export default Header;
