import React, { useState } from "react"
import ChooseFileInsert from './ChooseFileInsert';
import  './file-manager.css';
import {
  Dropdown,
  ButtonGroup,
  ProgressBar,
  ToggleButton,
  Modal,
} from "react-bootstrap"
import PropTypes from 'prop-types'

const LeftSidebar = (props) => {
  const [showChooseFile, setShowChooseFile] = useState(false);
  const handleShowChooseFile = () => setShowChooseFile(true);
  const handleCloseChooseFile = () => setShowChooseFile(false);
  
  return (
    <>
      <ButtonGroup className="d-block mb-2">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-success dropdown-toggle w-100">
              <i className="mdi mdi-plus"/> Add File{" "}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item  onClick={handleShowChooseFile} className="text-reset">
              <i className="mdi mdi-upload me-1"/> From My Computer
            </Dropdown.Item>
            <Modal show={showChooseFile} onHide={handleCloseChooseFile} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Choose File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChooseFileInsert handleClose={handleCloseChooseFile}/>
                </Modal.Body>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
      <div className="email-menu-list mt-5 mb-5">
        <ToggleButton onClick={props.onAllFilesClicked} key="allFiles" name="allFiles" id="allFiles"  variant="light" className="mb-2 customButton" >
          <i className="mdi mdi-folder-outline font-18 align-middle me-1"/>
          All Files
        </ToggleButton>
        <ToggleButton onClick={props.onIMGFilesClicked} name="recent" id="recent" variant="light" className="mb-2 customButton"> 
          <i className="mdi mdi-folder-image font-18 align-middle me-1"/>
          IMG Files 
        </ToggleButton>
        <ToggleButton onClick={props.onPDFFilesClicked} name="pdfFiles" id="pdfFiles" variant="light" className="mb-2 customButton">
          <i className="mdi mdi-file-pdf-box font-18 align-middle me-1"/>
          PDF Files
        </ToggleButton>
        <ToggleButton onClick={props.onTXTFilesClicked} name="txtFiles" id="txtFiles" variant="light" className="mb-2 customButton">
          <i className="mdi mdi-file-document font-18 align-middle me-1"/>
          TXT Files
        </ToggleButton>
        <ToggleButton onClick={props.onPNGFilesClicked} name="pngFiles" id="pngFiles" variant="light" className="mb-2 customButton">
          <i className="mdi mdi-file-document font-18 align-middle me-1"/>
          PNG Files
        </ToggleButton>
        <ToggleButton onClick={props.onJPGFilesClicked} name="jpgFiles" id="jpgFiles" variant="light" className="mb-2 customButton">
          <i className="mdi mdi-file-image font-18 align-middle me-1"/>
          JPG Files
        </ToggleButton>
        <ToggleButton onClick={props.onDeletedClicked} name="deleted" id="deleted" variant="light" className="mb-2 customButton">
          <i className="mdi mdi-delete font-18 align-middle me-1"/>
          Deleted Files
        </ToggleButton>
      </div>
      <div className="mt-5">
        <h4>
          <span className="badge rounded-pill p-1 px-2 badge-secondary-lighten">
            FREE
          </span>
        </h4>
        <h6 className="text-uppercase mt-3">Storage</h6>
        <ProgressBar variant="success" now={46} className="my-2 progress-sm" />
        <p className="text-muted font-13 mb-0">7.02 GB (46%) of 15 GB used</p>
      </div>
    </>
  )
}

LeftSidebar.propTypes = {
  onAllFilesClicked: PropTypes.func,
  onIMGFilesClicked: PropTypes.func,
  onPDFFilesClicked: PropTypes.func,
  onTXTFilesClicked: PropTypes.func,
  onPNGFilesClicked: PropTypes.func,
  onJPGFilesClicked: PropTypes.func,
  onDeletedClicked: PropTypes.func,
};

export default LeftSidebar