// Import Dependencies
import React from "react";
// import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";

// styled-components
const MakerTileWrapper = styled.div`
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
  max-height: 70%;
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
  background: rgba(255, 255, 238, .7);
  display: flex;
  flex-direction: column;
  /* this needs to be changed if there are more or less lines on the tile */
  height: 30%;
  justify-content: flex-end;
`;

class MakerTile extends React.Component {
  constructor(props) {
    super(props);
    // React strap Modal \\
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    // React strap Modal \\
  }
  render() {
    return (
      <MakerTileWrapper>
        {/* removed src="${https://someAWS.S3.URL}" */}
        <ImageHolder>
          <ProjectImage
            alt="PLACEHOLDER! alt text"
            src={this.props.maker.photo_url} />
        </ImageHolder>
        <Details>
          <div className="star-rating">
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
          </div>

          <p className="project-name">{this.props.maker.name}</p>
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
              {this.props.maker.name}
            </ModalHeader>
            <ModalBody>
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Do Something
            </Button>{" "}
            </ModalFooter>
          </Modal>
          {/* React strap Modal */}
        </Details>
      </MakerTileWrapper>
    );
  }
}

export default MakerTile;
