import React from "react"
import {
    Row,
  ButtonGroup,
  Col,
  Button
} from "react-bootstrap"
import PropTypes from 'prop-types'

const Pagination = (props) => {
    const startIndex = props.startIndex;
    const endIndex = props.endIndex < props.totalFiles ? props.endIndex  : props.totalFiles;
    const page = props.page + 1;
    const totalFiles = props.totalFiles; 
    const pageSize = props.pageSize; 
    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: 'All',
            value: props.totalFiles,
        },
    ];
    
    const paginationSizeHandler = (size) => {
        props.onSetPaginationSize(parseInt(size.target.value))
    };
    
    return (
        <Row className="mt-2">
            <Col className="mt-auto mb-auto"> 
                Showing {startIndex} - {endIndex} of {totalFiles}
            </Col>
            <Col md="auto">
                <label className="me-1">Display :</label>
                <select value={pageSize} onChange={paginationSizeHandler} className="form-select d-inline-block w-auto">
                    {sizePerPageList.map((pageSize, index) => {
                        return (
                            <option key={index} value={pageSize.value}>
                                {pageSize.text}
                            </option>
                        );
                    })}
                </select>
            </Col>
            <Col xs lg="2">
                <ButtonGroup className="float-end">
                    {props.page === 0 ? (
                        <Button variant="light" className="btn-sm" disabled>
                            <i className="mdi mdi-chevron-left"></i>
                        </Button>
                    ) : (
                        <Button variant="info" className="btn-sm" key="prevPage" value="prevPage" name="prevPage" id="prevPage" onClick={props.onGetPrevPage}>
                            <i className="mdi mdi-chevron-left"></i>
                        </Button>
                    )}
                    {page < props.totalPages ? (
                        <Button variant="info" className="btn-sm" key="nextPage" value="nextPage" name="nextPage" id="nextPage" onClick={props.onGetNextPage}>
                            <i className="mdi mdi-chevron-right"></i>
                        </Button>
                    ) : (
                        <Button variant="light" className="btn-sm" disabled>
                            <i className="mdi mdi-chevron-right"></i>
                        </Button>
                    )}
                </ButtonGroup>
            </Col>
        </Row>
    )
};

Pagination.propTypes = {
    totalFiles: PropTypes.number,
    page: PropTypes.number,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
    totalPages: PropTypes.number,
    pageSize: PropTypes.number,
    onGetPrevPage: PropTypes.func,
    onGetNextPage: PropTypes.func,
    onSetPaginationSize: PropTypes.func,
};

export default React.memo(Pagination)