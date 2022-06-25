import React, { useState } from 'react';
import toastr from 'toastr';
import debug from 'sabio-debug';
import { Button } from 'react-bootstrap';
import FilesService from '../../services/filesService';
import { Form } from "react-bootstrap"

const _logger = debug.extend('FileInsert');

function FileFormInsert() {
    const [fileFormData, setFileFormData] = useState({
        fileName: '',
        url: '',
        file: '',
        fileTypeId: null,
        dateToPublish: '',
        currentUserId: null
    });

    const onChangeFormData = (event) => {
        _logger('onChange', { syntheticEvent: event });
        const target = event.target;
        const newUservalue = target.value;
        const nameOfField = target.name;
        _logger({ nameOfField, newUservalue });
        setFileFormData((prevState) => {
            const updatedFormData = {
                ...prevState,
            };
            updatedFormData[nameOfField] = newUservalue;
            return updatedFormData;
        });
    };

    const onClickAddFileRequest = (e) => {
        e.preventDefault();
        FilesService.upload(fileFormData).then(onFileSuccess).catch(onAddFileError);
    };

    const onFileSuccess = (data) => {
        _logger(`Here is the Id: ${data.item}`);
        toastr.success('A File was Successfully Added');
        setFileFormData((prevState) => {
            const updatedId = {
                ...prevState,
            };
            updatedId.id = data.items;
            return updatedId;
        });
    };

    const onAddFileError = (err) => {
        _logger(err);
        toastr.error('Adding a File was Unsuccessful');
    };

    const onFileTypeChange = (e) => {
        _logger(e.target.value)
        setFileFormData((prevState) => {
            let formUpdate = { ...prevState };
            formUpdate.fileTypeId = e.target.value;
            return formUpdate;
        });
    }

    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="InputFileName">File Name</label>
                    <input
                        onChange={onChangeFormData}
                        value={fileFormData.templateId}
                        name="fileName"
                        type="text"
                        className="form-control"
                        id="InputFileName"
                        placeholder="Enter in a File Name"
                    />
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="InputLink">Link</label>
                    <input
                        onChange={onChangeFormData}
                        value={fileFormData.link}
                        name="link"
                        type="text"
                        className="form-control"
                        id="InputLink"
                        placeholder="Enter Link"
                    />
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="InputFileType">File Type</label>
                    <Form.Select onChange={onFileTypeChange} aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value={1}>(IMG) Image File Format</option>
                        <option value={2}>(PDF) Portable Document Format</option>
                        <option value={3}>(TXT) Text Document</option>
                        <option value={4}>(PNG) Portable Graphics Format</option>
                        <option value={5}>(JPG) Joint Photographic Experts Group</option>
                    </Form.Select>
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="InputDateToPublish">Publish Date</label>
                    <input
                        onChange={onChangeFormData}
                        value={fileFormData.dateToPublish}
                        name="dateToPublish"
                        type="date"
                        className="form-control"
                        id="InputDateToPublish"
                        placeholder="Enter the Publish Date"
                    />
                </div>
                <div className="pt-3">
                    <Button onClick={onClickAddFileRequest} type="submit" className="btn btn-primary float-end">
                        Add File
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FileFormInsert;
