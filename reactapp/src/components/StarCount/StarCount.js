// Dependencies
import React from 'react';
import styled from 'styled-components';

const StarCountContainer = styled.div``;

const StarCount = props => {
	return <StarCountContainer>{'* '.repeat(props.rating)}</StarCountContainer>;
};

export default StarCount;
