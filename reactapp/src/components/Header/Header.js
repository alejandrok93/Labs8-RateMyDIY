import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	width: 100%;
	height: 10%;
	display: flex;
	position: fixed;

	border: 1px solid red;
`;

const Header = props => {
	return <HeaderContainer />;
};

export default Header;
