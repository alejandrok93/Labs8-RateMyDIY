// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
//Import components
import { ProjectTile } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getFeaturedProjects } from '../../../actions/landingPageActions';

// styled components
const FeaturedProjectsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
`;

const FeaturedProjectListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: space-between;
`;

const FeaturedProjectTitle = styled.h1`
	font-size: 18px;
	width: 100%;
	margin: 10px 25px;
`;

class FeaturedProjects extends Component {
	componentDidMount() {
		this.props.getFeaturedProjects();
	}
	render() {
		return (
			<FeaturedProjectsWrapper>
				<FeaturedProjectTitle>Featured Projects</FeaturedProjectTitle>
				<FeaturedProjectListTiles>
					{this.props.featuredProjects.map(project => (
						<ProjectTile project={project} key={project.project_id} />
					))}
				</FeaturedProjectListTiles>
			</FeaturedProjectsWrapper>
		);
	}
}

const mapStateToProps = state => ({
	featuredProjects: state.landingPageReducer.featuredProjects,
	gettingFeaturedProjects: state.landingPageReducer.fetchingFeaturedProjects,
	featuredProjectsError: state.landingPageReducer.featuredProjectsError
});

export default connect(
	mapStateToProps,
	{ getFeaturedProjects }
)(FeaturedProjects);