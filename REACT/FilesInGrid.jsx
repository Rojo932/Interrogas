import React from "react"
import { Link } from "react-router-dom"
import { saveAs } from "file-saver";
import FilesService from "../../services/filesService"
import {
  Dropdown,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap"
import PropTypes from 'prop-types'
import  './file-manager.css';
import Swal from 'sweetalert2'
import debug from 'sabio-debug';

const _logger = debug.extend('FilesInGrid');

const FilesInGrid = props => {
  const pageData = props || null;

  const onDeleteKey = (e) => {
    e.preventDefault()
    const itemId = parseInt(e.target.id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-warning m-1',
        cancelButton: 'btn btn-outline-secondary m-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "This file will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const onDeleteSuccess = () => {
          props.render();
          swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
        };

        const onDeleteError = (err) => {
            _logger("Error",err);
            swalWithBootstrapButtons.fire('Oops...', 'Something went wrong!', 'error');
        };
        const payload = {
          id: itemId,
          statusId: 0
        }

        FilesService.updateStatusId(itemId, payload).then(onDeleteSuccess).catch(onDeleteError)

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }

  const onActivateKey = (e) => {
    e.preventDefault()
    const itemId = parseInt(e.target.id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-1',
        cancelButton: 'btn btn-outline-secondary m-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Restore!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const onActivateSuccess = () => {
          props.render();
          swalWithBootstrapButtons.fire('Activated!', 'Your file has been restored.', 'success');
        };

        const onActivateError = (err) => {
            _logger("Error",err);
            swalWithBootstrapButtons.fire('Oops...', 'Something went wrong!', 'error')
        };
        let payload = {
          "id": itemId,
          "statusId": 1
        }

        FilesService.updateStatusId(itemId, payload).then(onActivateSuccess).catch(onActivateError)

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file remains deleted :)',
          'error'
        )
      }
    })
  }

  function copyLink(e) {
    e.preventDefault()
    const el = document.createElement('input');
    el.value = e.target.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Copied To Clipboard',
      showConfirmButton: false,
      timer: 1500
    })
  }


  const downloadFile = (e) => {
    e.preventDefault()
    saveAs(
      e.target.href,
      e.target.name
    );
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Downloaded',
      showConfirmButton: false,
      timer: 1500
    })
  };

  return (
    <>
      <div className="mt-3">
        <h5 className="mb-3">{pageData.title} </h5>
        <Row xs="auto" className="g-3 m-auto gridStyleScroll">
          {pageData.arrayData.map((file, index) => {
            return (
              <Col key={index}>
                <Card className="mb-0 gridStyleCard" key={index}>
                  <Card.Body className="p-3 m-auto">
                    <h5 className="mt-3">
                        <Link to="#" className="text-body">
                            {file.fileName}
                        </Link>
                    </h5>
                    <p className="mb-0 filesInGridP1">
                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                            <i className="mdi mdi-folder-outline text-muted"/>{file.fileType}
                        </span>
                        <span className="text-nowrap mb-2 d-inline-block">
                            <i className="mdi mdi-account-box text-muted"/>{' '}
                            Created by:{file.createdBy}
                        </span>
                    </p>
                    <p className="mb-0 filesInGridP2">
                      <small className="text-muted">
                        <i className="mdi mdi-calendar-clock"/>{' '}Date Created: {file.dateCreated}
                      </small>
                    </p>
                    <p className="mb-0 filesInGridP3">
                      <small className="text-muted">
                        <i className="mdi mdi-calendar-clock"/>{' '}Last Modified: {file.dateModified}
                      </small>
                    </p>
                    <div className="filesInGridP4">
                      <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle
                            variant="link"
                            className="text-muted card-drop arrow-none cursor-pointer p-0 shadow-none">
                            <i className="mdi mdi-dots-vertical font-18"></i>
                        </Dropdown.Toggle>
                        {pageData.title === "Deleted Files" ?
                            <Dropdown.Menu>
                              <Dropdown.Item id={file.id} onClick={onActivateKey}>
                                <i className="mdi mdi-basket-unfill me-2 text-muted vertical-middle"></i>
                                Activate
                              </Dropdown.Item>
                              <Dropdown.Item name={file.fileName} href={file.url} onClick={downloadFile}>
                                <i className="mdi mdi-download me-2 text-muted vertical-middle"></i>
                                Download
                              </Dropdown.Item>
                            </Dropdown.Menu>:
                            <Dropdown.Menu>
                              <Dropdown.Item href={file.url} onClick={copyLink}>
                                <i className="mdi mdi-link me-2 text-muted vertical-middle"></i>
                                Get Sharable Link
                              </Dropdown.Item>
                              <Dropdown.Item href={file.url} onClick={downloadFile}>
                                <i className="mdi mdi-download me-2 text-muted vertical-middle"></i>
                                Download
                              </Dropdown.Item>
                              <Dropdown.Item id={file.id} onClick={onDeleteKey}>
                                <i className="mdi mdi-delete me-2 text-muted vertical-middle"></i>
                                Remove
                              </Dropdown.Item>
                            </Dropdown.Menu>
                         }
                      </Dropdown>
                      <Button variant="light" href={file.url} className="text-reset text-decoration-underline">
                        <i className="mdi mdi-link"/>Url Link
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

FilesInGrid.propTypes = {
  arrayData: PropTypes.arrayOf(PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    createdBy: PropTypes.number.isRequired, 
    dateModified: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })),
  title: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  render: PropTypes.func
};

FilesInGrid.defaultProps = {
  arrayData: [],
};

export default React.memo(FilesInGrid)