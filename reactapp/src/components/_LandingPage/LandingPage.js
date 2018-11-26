// Import Dependencies
import React, { Component } from "react";
// import { NavLink, Link, Route } from "react-router-dom";
import styled from "styled-components";

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

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = { input: "" };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ ...this.state, input: e.target.value });
  };

  handleSearch = e => {
    //HTTP request to server
    //Get search results from server
    //Save to Redux store
  };

  render() {
    // console.log(SearchBar);
    return (
      <LandingPageWrapper>
        <DropdownMenu>
          <DropDown />
        </DropdownMenu>
        <LandingPageContentWrapper>
          <SearchBar handleChange={this.handleChange} />
          <Twillio />
          <FeaturedProjects />
          <PopularMakers />
          <PopularReviewers />
        </LandingPageContentWrapper>
      </LandingPageWrapper>
    );
  }
}