// Import Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

// styled-components
const ProjectTileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
	overflow: hidden;
	width: 200px;
	height: 200px;
`;

const ImageHolder = styled.div`
	max-width: 200px;
	/* this needs to be changed if there are more or less lines on the tile */
	max-height: 65%;
`;

const ProjectImage = styled.img`
	display: block;
	max-width: 100%;
	max-height: 100%;
	width: auto;
	height: auto;
	background: #fee;
`;

const Details = styled.div`
	background: rgba(255, 255, 238, 0.7);
	display: flex;
	flex-direction: column;
	/* this needs to be changed if there are more or less lines on the tile */
	height: 40%;
	justify-content: flex-end;
`;

class ProjectTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
	}

	// Sets state for the reactstrap modal
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		return (
			<ProjectTileWrapper>
				{/* removed src="${https://someAWS.S3.URL}" */}
				<ImageHolder>
					<ProjectImage
						alt="PLACEHOLDER! alt text"
						src={this.props.project.img_url}
					/>
				</ImageHolder>
				<Details>
					<div className="star-rating">
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
					</div>
					<a
						href={`/project/${this.props.project.project_id}`}
						className="project-name"
					>
						{this.props.project.project_name}
					</a>
					<Link to={`/${this.props.project.user_id}`}>
						{this.props.project.username}
					</Link>
					{/* React strap Modal */}
					<Button color="danger" onClick={this.toggle}>
						{' '}
						<h3>Review</h3>
						{this.props.buttonLabel}{' '}
					</Button>
					<Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						className={this.props.className}
						dialogClassName="my-modal"
					>
						<ModalHeader toggle={this.toggle}>
							{this.props.project.project_name}
						</ModalHeader>
						<ModalBody>
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
						</ModalBody>
						<ModalBody>{this.props.project.user_id}</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>
								Do Something
							</Button>{' '}
						</ModalFooter>
					</Modal>
					{/* React strap Modal */}
				</Details>
			</ProjectTileWrapper>
		);
	}
}

export default ProjectTile;
