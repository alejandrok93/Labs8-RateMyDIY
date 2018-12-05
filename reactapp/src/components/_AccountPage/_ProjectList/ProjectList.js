import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyProjects } from '../../../actions';
import { AccountSideBar, Nav } from '../../../components';
import './ProjectList.css';

class ProjectList extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.userInfo !== this.props.userInfo) {
			console.log('USERINFO', this.props.userInfo);
			this.props.fetchMyProjects(this.props.userInfo.user_id);
		}
		console.log(this.props.myProjects);
	}

	render() {
		return (
			<div className="projectPage">
				<Nav />
				<div className="project-list-container">
					<AccountSideBar />

					<div className="myProjectDisplay">
						{this.props.myProjects.map(myProject => {
							return (
								<div className="myProjectDisplay" key={myProject.project_id}>
									<Link to={`project/${myProject.project_id}`}>
										<h2>{myProject.project_name}</h2>
									</Link>
									<p>{myProject.project_rating}</p>
									<img src={myProject.img_url} alt="" />
								</div>
							);
						})}
						<div className="addNew">
							<h2>New Project</h2>
							<Link to="">
								<img
									alt="PLACEHOLDER! alt text"
									src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		myProjects: state.myProjectReducer.myProjects,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ fetchMyProjects }
)(ProjectList);
