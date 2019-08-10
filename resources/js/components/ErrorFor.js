import React from 'react'

const ErrorFor = ({ field, hasError, ...props }) => {
    if(!hasError(field)) {
        return (
            <span className='invalid-feedback'>
                <strong>{props.errors[field][0]}</strong>
            </span>
        )
    }
};

export default ErrorFor;
