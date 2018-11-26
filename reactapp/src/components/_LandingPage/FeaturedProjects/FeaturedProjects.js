// Import Dependencies
import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';
//Import components
import { ProjectTile } from '../../../components';

//Import Styling
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
	// constructor() {
	//   super();
	// } // useless constructor

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

export default FeaturedProjects;
