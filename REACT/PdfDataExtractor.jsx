import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import filesService from '../../services/filesService';
import 'toastr/build/toastr.css';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';

function PdfUploader(props) {
    PdfUploader.propTypes = {
        getData: PropTypes.func,
    };

    const [initial] = useState({ file: '' });

    const onExtractSuccess = (response) => {
        toastr.success('Successfully extracted data');
        props.getData(response.data.item);
    };

    const onExtractError = (response) => toastr.error(response.response.data.errors);

    const extractData = (e) => {
        const currentFile = e.target.files[0];
        const pdfData = new FormData();
        pdfData.append('file', currentFile);
        filesService.extract(pdfData).then(onExtractSuccess).catch(onExtractError);
    };
    return (
        <React.Fragment>
            <Formik initialValues={initial} enableReinitialize={true}>
                <Form onChange={extractData}>
                    <Field type="file" name={'file'}></Field>
                </Form>
            </Formik>
        </React.Fragment>
    );
}

export default PdfUploader;
