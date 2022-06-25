import React from 'react';
import FileUpload from '../../components/file/FileUpload';
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

function ChooseFormInsert(props) {
    const onSuccess = () => {
        props.handleClose()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your file has been saved',
            showConfirmButton: false,
            timer: 1000
        })
    }

    return (
        <div className="container">
            <div className="form-group pt-2">
                <FileUpload onFileChange={onSuccess} name="genericFileUpload"/>
            </div>
        </div>
    );
}

ChooseFormInsert.propTypes = {
    handleClose: PropTypes.func,
  };

export default ChooseFormInsert;