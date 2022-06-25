import React from "react"
import { Link } from "react-router-dom"
import { saveAs } from "file-saver";
import FilesService from "../../services/filesService"
import {
  Dropdown,
  ButtonGroup,
  Table,
  Button, 
} from "react-bootstrap"
import PropTypes from 'prop-types'
import  './file-manager.css';
import Swal from 'sweetalert2'
import debug from 'sabio-debug';

const _logger = debug.extend('FilesInRows');

const FilesInRows = props => {
  const pageData = props || null;
  
  const convertToTime = (data) => {
    return new Date(data).toLocaleTimeString()
  }

  const convertToDate = (data) => {
    return new Date(data).toLocaleDateString()
  }

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
      toast: true,
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
        <div className="tableFixHead">
          <Table className="table table-centered mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-0" width="2%">#</th>
                <th className="border-0" width="20%">Name</th>
                <th className="border-0">File Type</th>
                <th className="border-0">URL</th>
                <th className="border-0">Date Created</th>
                {pageData.title === "Deleted Files" ?
                  <th className="border-0">Date Deleted</th> : 
                  <th className="border-0">Last Modified</th>
                }
                <th className="border-0" style={{ width: "80px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.arrayData.map((file, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <span className="text-muted font-12">
                        {(index + 1) + (pageData.page * pageData.pageSize)}
                      </span>
                    </td>
                    <td>
                      <span className="mb-0 fw-semibold">
                        <Link to="#" className="text-reset">
                          {file.fileName}
                        </Link>
                      </span>
                    </td>
                    <td>
                      <i className="mdi mdi-folder-outline text-muted"/>{' '}{file.fileType}
                    </td>
                    <td>
                      <Button variant="light" href={file.url} target="_blank" className="text-reset text-decoration-underline">
                        <i className="mdi mdi-link"/>Link
                      </Button>
                    </td>
                    <td>
                      <p className="mb-0">
                        <i className="mdi mdi-calendar-clock"/>{" " + convertToDate(file.dateCreated) + " " + convertToTime(file.dateCreated)}
                      </p>
                      <span className="font-12">
                        <i className="mdi mdi-account-box"/>{' '}by {file.createdBy}
                      </span>
                    </td>
                    <td>
                      <p className="mb-0">
                          <i className="mdi mdi-calendar-clock"/>{" " + convertToDate(file.dateModified) + " " + convertToTime(file.dateModified)}
                      </p>
                    </td>
                    <td>
                      <ButtonGroup className="d-block">
                        <Dropdown>
                          <Dropdown.Toggle
                            align="end"
                            className="table-action-btn dropdown-toggle arrow-none btn btn-light btn-xs"
                          >
                            <i className="mdi mdi-dots-horizontal"></i>
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
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

FilesInRows.propTypes = {
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

FilesInRows.defaultProps = {
  arrayData: [],
};

export default React.memo(FilesInRows)