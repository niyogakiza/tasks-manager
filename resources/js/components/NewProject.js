import React, { useState } from 'react'
import axios from 'axios'
import ErrorFor from "./ErrorFor.js";
import { hasErrorFor } from './HasErrorFor.js'

const NewProject = props => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const handleFieldChange = event => {
        setName(event.target.value)
    };

    const handleCreateNewProject = event => {
        event.preventDefault();
        const project = {
            name,
            description
        };

        axios.post('/api/projects', project)
            .then(response => {
                props.history.push('/');
              // setDescription(response.data.description)
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    };

    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>Create new project</div>
                        <div className='card-body'>
                            <form onSubmit={handleCreateNewProject}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Project name</label>
                                    <input
                                        id='name'
                                        type='text'
                                        className={`form-control ${hasErrorFor('name', errors) ? 'is_invalid' : ''}`}
                                        name='name'
                                        value={name}
                                        onChange={handleFieldChange}
                                    />
                                    <ErrorFor field='name' hasError={hasErrorFor('name', errors)}/>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Project description</label>
                                    <textarea
                                        id='description'
                                        className={`form-control ${hasErrorFor('description', errors) ? 'is_invalid': ''}` }
                                        name='description'
                                        value={description}
                                        onChange={handleFieldChange}
                                        rows='10'
                                    />
                                </div>
                                <button className='btn btn-primary'>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewProject
