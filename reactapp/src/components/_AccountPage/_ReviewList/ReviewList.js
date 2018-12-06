import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyReviews,fetchSearchResults } from '../../../actions';
import { AccountSideBar } from '../../../components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import { Header } from '../../../components';
import './ReviewList.css';
import styled from 'styled-components';
const CardLink = styled.a`
  text-decoration: none;
  color:black &:hover {
    text-decoration: none;
    color: black;
  }
`;


class ReviewList extends Component {
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

  componentDidMount(){
	  this.props.fetchMyReviews(this.props.userInfo.user_id);
  }

  render() {
    if (!this.props.myReviews || this.props.myReviews.length === 0) {
      return (
        <div>
          <Header
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
          />
          <div className="reviewPage">
            <div className="sideBar">
              <AccountSideBar />
            </div>
            <div className="addNewReview">
              <h2>Add a new review</h2>
              <Link to="">
                <img
                  alt="PLACEHOLDER! alt text"
                  src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
                />
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
          />

          <div className="reviewPage">
            <AccountSideBar />

            <div className="myReviewDisplay">
              {this.props.myReviews.map(myReviews => {
                return (
                  <div className="myReviewsDisplay" key={myReviews.review_id}>
                   <CardLink
                    className="project-card"
                    href={`project/${myReviews.project_id}`}
                  >
                    <Card>
                      <CardHeader action={null} title={myReviews.text} />
                      {/* <div className="projectImg">
                        <img src={myProject.img_url} />
                      </div> */}
                      <CardMedia image={myReviews.img_url} />
                      <CardContent>
                        <StarRatings
                          rating={Math.round(myReviews.rating)}
                          starRatedColor="yellow"
                          starDimension="14px"
                          starSpacing="4px"
                          starRatedColor="black"
                        />
                      </CardContent>
                      
                    </Card>
                    </CardLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}

{
  /* <h2>{myReviews.text}</h2>
									<p>{myReviews.rating}</p>
									<img src={myReviews.img_url} alt="" /> */
}
const mapStateToProps = state => {
  return {
    myReviews: state.myProjectReducer.myReviews,
    userInfo: state.loggedInReducer.userInfo
  };
};

export default connect(
  mapStateToProps,
  { fetchMyReviews,fetchSearchResults }
)(ReviewList);
