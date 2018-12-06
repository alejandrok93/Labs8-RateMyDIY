import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { AccountSideBar, Nav } from '../../../components';
import { Header } from '../../../components';
import './ProjectList.css';

import {
  fetchMyProjects,
  fetchSearchResults,
  fetchCategoryResults
} from '../../../actions';

const styles = theme => ({
  card: {
    width: '300px',
    margin: '25px',
    '&:hover': {
      backgroundColor: '0'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const CardLink = styled.a`
  text-decoration: none;
  color:black &:hover {
    text-decoration: none;
    color: black;
  }
`;

class ProjectList extends Component {
  constructor() {
    super();
    this.state = { input: '' };
  }

  handleChange = e => {
    this.setState({ ...this.state, input: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    const searchTerm = this.state.input;
    console.log(searchTerm);
    //call featch search results action
    //push to search page
    this.props.fetchSearchResults(searchTerm);
    this.props.history.push(`/search?query=${searchTerm}`);
  };

 

  componentDidMount() {
    this.props.fetchMyProjects(this.props.userInfo.user_id);
  }

  //  <div className="myProjectDisplay" key={myProject.project_id}>
  //                   <Link to={`project/${myProject.project_id}`}>
  //                     <h2>{myProject.project_name}</h2>
  //                   </Link>
  //                   <p>{myProject.project_rating}</p>
  //                   <img src={myProject.img_url} alt="" />
  //                 </div>

  render() {
    const { classes } = this.props;

    return (
      <div className="projectPage">
        <Header
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
        <Nav />
        <div className="project-list-container">
          <AccountSideBar />

          <div className="myProjectDisplay">
            {this.props.myProjects.map(myProject => {
              return (
                <div className="myProjectDisplay" key={myProject.project_id}>
                  <CardLink
                    className="project-card"
                    href={`project/${myProject.project_id}`}
                  >
                    <Card>
                      <CardHeader
                        action={null}
                        title={myProject.project_name}
                      />
                      {/* <div className="projectImg">
                        <img src={myProject.img_url} />
                      </div> */}
                      <CardMedia
                        image={myProject.img_url}
                        title={myProject.project_name}
                      />
                      <CardContent>
                        <StarRatings
                          rating={Math.round(myProject.project_rating)}
                          starRatedColor="yellow"
                          starDimension="14px"
                          starSpacing="4px"
                          starRatedColor="black"
                        />
                      </CardContent>
                      <CardContent>
                        <Typography component="p">
                          [THIS IS THE PROJECT DESCRIPTION]
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardLink>
                </div>
              );
            })}
            <div className="addNew">
              <h2>New Project</h2>
              <Link to="/newproject">
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

ProjectList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    myProjects: state.myProjectReducer.myProjects,
    userInfo: state.loggedInReducer.userInfo
  };
};

export default connect(
  mapStateToProps,
  { fetchSearchResults, fetchCategoryResults, fetchMyProjects }
)(ProjectList);
