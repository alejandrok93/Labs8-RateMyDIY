// Import Dependencies
import React from "react";
// import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import styled from "styled-components";

// styled-components
const ReviewerTileWrapper = styled.div`
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
  max-height: 80%;
`;

const ReviewerImage = styled.img`
display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  background: #fee;
`;

const Details = styled.div`
  background: rgba(255, 255, 238, .7);
  display: flex;
  flex-direction: column;
  /* this needs to be changed if there are more or less lines on the tile */
  height: 20%;
  justify-content: flex-end;
`;

class ReviewerTile extends React.Component {
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
      <ReviewerTileWrapper>
        {/* removed src="${https://someAWS.S3.URL}" */}
        <ImageHolder>
          <ReviewerImage
            alt="PLACEHOLDER! alt text"
            src={this.props.reviewer.photo_url} />
        </ImageHolder>
        <Details>
          <p className="project-name">{this.props.reviewer.name}</p>
          {/* React strap Modal */}
          <Button color="danger" onClick={this.toggle}>
            {" "}
            <h3>Review</h3>
            {this.props.buttonLabel}{" "}
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            dialogClassName="my-modal"
          >
            <ModalHeader toggle={this.toggle}>
              {this.props.reviewer.name}
            </ModalHeader>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Do Something
            </Button>{" "}
            </ModalFooter>
          </Modal>
          {/* React strap Modal */}
        </Details>
      </ReviewerTileWrapper>
    );
  }
}

export default ReviewerTile;
