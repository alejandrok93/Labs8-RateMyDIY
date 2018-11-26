// Import Dependencies
import React, { Component } from "react";
// import { NavLink, Link, Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getReviewers } from "../../actions";


//Import components
import {
  DropDown,
  FeaturedProjects,
  PopularMakers,
  PopularReviewers,
  SearchBar,
  Twillio
} from "../../components";

// styled-components
const LandingPageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
`;
const LandingPageWrapper = styled.div`
  width: 100%;
`;
const DropdownMenu = styled.div`
  width: 100%;
`;

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { input: "" };
  }

  componentDidMount() {
    console.log("component did mount!");
    this.props.getReviewers();
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ ...this.state, input: e.target.value });
  };

  handleSearch = e => {
    //call featch search results action
    this.props.fetchSearchResults(this.state.input);

    //push to search page
    this.props.history.push("/search");
  };

  render() {
    // console.log(SearchBar);
    return (
      <LandingPageWrapper>
        <DropdownMenu>
          <DropDown />
        </DropdownMenu>
        <LandingPageContentWrapper>
          <SearchBar
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
          />
          <Twillio />
          <FeaturedProjects featuredProjects={this.props.featuredProjects} />
          <PopularMakers popularMakers={this.props.popularMakers} />
          <PopularReviewers reviewers={this.props.popularReviewers} />
        </LandingPageContentWrapper>
      </LandingPageWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    featuredProjects: state.landingPageReducer.featuredProjects,
    popularMakers: state.landingPageReducer.popularMakers,
    popularReviewers: state.landingPageReducer.popularReviewers
  };
};

export default connect(
  mapStateToProps,
  { getReviewers }
)(LandingPage);
