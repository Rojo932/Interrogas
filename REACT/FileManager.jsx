import React, {useState, useEffect} from "react";
import {
  Row,
  Col,
  Card,
} from "react-bootstrap";
import LeftSidebar from "./LeftSidebar" ;
import FilesInRows from "./FilesInRows";
import FilesInGrid from "./FilesInGrid";
import Pagination from "./Pagination";
import PageTitle from "../candidates/PageTitle";
import FilesService from "../../services/filesService";
import toastr from 'toastr';

const FileManager = () => {

  const [pageData, setPageData] = useState({
    filesArray: [],
    search: "",
    searchMatch: false,
    filesStyle: "",
    filesTitle: "",
    filesType: null,
    page: 0,
    totalFiles: null,
    pageSize: 10,
    startIndex: null,
    endIndex: null,
    totalPages: null,
  });

  const updatePageData = (title, data, fileType) => {
    setPageData((prevState)=> {
      const pd = {...prevState};
      pd.filesArray = data.pagedItems;
      pd.totalFiles = data.totalCount;
      pd.page = data.pageIndex ;
      pd.startIndex = (data.pageIndex + 1) * data.pageSize - data.pageSize + 1;
      pd.endIndex = (data.pageIndex + 1) * data.pageSize;
      pd.totalPages = data.totalPages;
      pd.filesTitle = title;
      pd.filesType = fileType || null;
      return pd;
    });
  };

  useEffect(()=>{
    setPageData((prevState)=> {
      const pd = {...prevState};
      pd.filesStyle = "FilesInRows";
      return pd;
    })
    allFilesRender();
  },[])

  const onGetError = () => {
    toastr.error("Could not find files.");
  };

  const onSearchError = () => {
    setPageData((prevState)=> {
      const pd = {...prevState}
      pd.searchMatch = false;
      pd.filesArray= [];
      pd.totalFiles = 0;
      pd.startIndex = 0;
      pd.endIndex = 0;
      pd.totalPages = 0;
      return pd;
    })
  };

  const onAllFilesSuccess = (response) => {
    const title = "All Files";
    updatePageData(title, response.data.item);
  };

  const onSearchSuccess = (response) => {
    const title = "Searching...";
    updatePageData(title, response.data.item);
    setPageData((prevState)=> {
      const pd = {...prevState}
      pd.searchMatch = true;
      return pd;
    });
  };

  const onIMGFilesSuccess = (response) => {
    const fileTypeInt = 1;
    const title = "IMG Files";
    updatePageData(title, response.data.item, fileTypeInt);
  };

  const onPDFFilesSuccess = (response) => {
    const fileTypeInt = 2;
    const title = "PDF Files";
    updatePageData(title, response.data.item, fileTypeInt);
  };

  const onTXTFilesSuccess = (response) => {
    const fileTypeInt = 3;
    const title = "TXT Files";
    updatePageData(title, response.data.item, fileTypeInt);
  };

  const onPNGFilesSuccess = (response) => {
    const fileTypeInt = 4;
    const title = "PNG Files";
    updatePageData(title, response.data.item, fileTypeInt);
  };

  const onJPGFilesSuccess = (response) => {
    const fileTypeInt = 5;
    const title = "JPG Files";
    updatePageData(title, response.data.item, fileTypeInt);
  };

  const onDeletedFilesSuccess = (response) => {
    const title = "Deleted Files";
    updatePageData(title, response.data.item);
  };

  const allFilesRender = () => FilesService.getFilePaginate(0, pageData.pageSize).then(onAllFilesSuccess).catch(onGetError);

  const imgFilesRender = () => FilesService.getFileTypePaginate(1, 0, pageData.pageSize).then(onIMGFilesSuccess).catch(onGetError);

  const pdfFilesRender = () => FilesService.getFileTypePaginate(2, 0, pageData.pageSize).then(onPDFFilesSuccess).catch(onGetError);

  const txtFilesRender = () => FilesService.getFileTypePaginate(3, 0, pageData.pageSize).then(onTXTFilesSuccess).catch(onGetError);

  const pngFilesRender = () => FilesService.getFileTypePaginate(4, 0, pageData.pageSize).then(onPNGFilesSuccess).catch(onGetError);

  const jpgFilesRender = () => FilesService.getFileTypePaginate(5, 0, pageData.pageSize).then(onJPGFilesSuccess).catch(onGetError);

  const deletedRender = () => FilesService.getDeletePaginate(0, pageData.pageSize).then(onDeletedFilesSuccess).catch(onGetError);

  const serviceDesignator = (pageIndex, pageSize, fileType, search) => {
    if (pageData.filesTitle === "All Files") {
      FilesService.getFilePaginate(pageIndex, pageSize).then(onAllFilesSuccess).catch(onGetError);
    }
    else if (pageData.filesTitle === "Searching...") {
      FilesService.getSearchPaginate(search, pageIndex, pageSize).then(onSearchSuccess).catch(onSearchError);
    }
    else if (pageData.filesTitle === "IMG Files") {
      FilesService.getFileTypePaginate(fileType, pageIndex, pageSize).then(onIMGFilesSuccess).catch(onGetError);
    }
    else if (pageData.filesTitle === "PDF Files") {
      FilesService.getFileTypePaginate(fileType, pageIndex, pageSize).then(onPDFFilesSuccess).catch(onGetError);
    }
    else if (pageData.filesTitle === "TXT Files") {
      FilesService.getFileTypePaginate(fileType, pageIndex, pageSize).then(onTXTFilesSuccess).catch(onGetError);
    }
    else if (pageData.filesTitle === "PNG Files") {
      FilesService.getFileTypePaginate(fileType, pageIndex, pageSize).then(onPNGFilesSuccess).catch(onGetError);
    }
    else if (pageData.filesTitle === "JPG Files") {
      FilesService.getFileTypePaginate(fileType, pageIndex, pageSize).then(onJPGFilesSuccess).catch(onGetError);
    }
    else if (pageData.filesTitle === "Deleted Files") {
      FilesService.getDeletePaginate(pageIndex, pageSize).then(onDeletedFilesSuccess).catch(onGetError);
    };
  };

  const nextPageClicked = () => {
    var nextPage = pageData.page + 1;
    if (nextPage > pageData.totalFiles / pageData.pageSize) {
      nextPage = pageData.totalFiles / pageData.pageSize;
    };
    pageData.page = nextPage;
    serviceDesignator(nextPage, pageData.pageSize, pageData.filesType, pageData.search);
  };

  const prevPageClicked = () => {
    var prevPage = pageData.page - 1;
    if (prevPage <= 0) prevPage = 0;
    pageData.page = prevPage
    serviceDesignator(prevPage, pageData.pageSize, pageData.filesType, pageData.search);
  };

  const handleReRender = () => {
    serviceDesignator(pageData.page, pageData.pageSize, pageData.filesType, pageData.search);
  };

  const setPaginationSize = (size) => {
    setPageData((prevState)=> {
      const pd = {...prevState};
      pd.pageSize = size;
      return pd;
    });
    serviceDesignator(pageData.page, size, pageData.filesType, pageData.search);
  };

  const setRowStyle = () => {
    setPageData((prevState)=> {
      const pd = {...prevState};
      pd.filesStyle = "FilesInRows";
      return pd;
    });
  };

  const setGridStyle = () => {
    setPageData((prevState)=> {
      const pd = {...prevState};
      pd.filesStyle = "FilesInGrid";
      return pd;
    });
  };

  const setSearch = (e) => {
    const query = e.target.value
    e.preventDefault();
    setPageData((prevState)=> {
      const pd = {...prevState}
      pd.search = query
      return pd;
    })
    if(query === ''){
      allFilesRender()
    }
    else{
      FilesService.getSearchPaginate(query, 0, pageData.pageSize).then(onSearchSuccess).catch(onSearchError);
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "File Manager", path: "/filemanager", active: true }
        ]}
        title={"File Manager"}
      /> 
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="page-aside-left">
                <LeftSidebar 
                  onAllFilesClicked={allFilesRender} 
                  onIMGFilesClicked={imgFilesRender} 
                  onPDFFilesClicked={pdfFilesRender}
                  onTXTFilesClicked={txtFilesRender}
                  onPNGFilesClicked={pngFilesRender}
                  onJPGFilesClicked={jpgFilesRender} 
                  onDeletedClicked={deletedRender}
                />
              </div>
              <div className="page-aside-right">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="app-search">
                    <Row xs="auto">
                      <Col>
                        <form>
                          <div className="mb-2 position-relative">
                            <input
                              onChange={setSearch}
                              type="text"
                              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                              className="form-control"
                              placeholder="Search files..."
                            />
                            <span className="mdi mdi-magnify search-icon"></span>
                          </div>
                        </form>
                      </Col>
                      {pageData.filesTitle === "Searching..." && 
                      <Col className="mt-2">
                        {pageData.searchMatch === true ?
                        <span  className="badge bg-success">Match</span>:
                        <span  className="badge bg-danger">No Match</span>
                        }
                      </Col>}
                    </Row>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-sm btn-light" onClick={setRowStyle}>
                      <i className="mdi mdi-format-list-bulleted"></i>
                    </button>
                    <button type="submit" className="btn btn-sm" onClick={setGridStyle}>
                      <i className="mdi mdi-view-grid"></i>
                    </button>
                    <button type="submit" className="btn btn-sm">
                      <i className="mdi mdi-information-outline"></i>
                    </button>
                  </div>
                </div>
                {pageData.filesStyle === "FilesInRows" && 
                <FilesInRows arrayData={pageData.filesArray} title={pageData.filesTitle} pageSize={pageData.pageSize} page={pageData.page} render={handleReRender}/>}
                {pageData.filesStyle === "FilesInGrid" && 
                <FilesInGrid arrayData={pageData.filesArray} title={pageData.filesTitle} pageSize={pageData.pageSize} page={pageData.page} render={handleReRender}/>}
                <Pagination 
                  totalFiles={pageData.totalFiles} 
                  page={pageData.page} 
                  startIndex={pageData.startIndex} 
                  endIndex={pageData.endIndex} 
                  totalPages={pageData.totalPages}
                  pageSize={pageData.pageSize}
                  onGetPrevPage={prevPageClicked}
                  onGetNextPage={nextPageClicked}
                  onSetPaginationSize={setPaginationSize}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default FileManager