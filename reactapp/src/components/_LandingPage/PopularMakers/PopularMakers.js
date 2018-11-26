// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
//Import components
import { MakerTile } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getPopularMakers } from '../../../actions/landingPageActions';

// styled components
const PopularMakersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
`;
const PopularMakerListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: space-between;
`;

const PopularMakersTitle = styled.h1`
	font-size: 18px;
	width: 100%;
	margin: 10px 25px;
`;

class PopularMakers extends Component {
	componentDidMount() {
		this.props.getPopularMakers();
	}
	render() {
		return (
			<PopularMakersWrapper>
				<PopularMakerListTiles>
					<PopularMakersTitle>Popular Makers</PopularMakersTitle>
					{this.props.popularMakers.map(maker => (
						<MakerTile maker={maker} key={maker.maker_id} />
					))}
				</PopularMakerListTiles>
			</PopularMakersWrapper>
		);
	}
}

const mapStateToProps = state => ({
	popularMakers: state.landingPageReducer.featuredProjects,
	fetching: state.landingPageReducer.fetching,
	error: state.landingPageReducer.error
});

export default connect(
	mapStateToProps,
	{ getPopularMakers }
)(PopularMakers);