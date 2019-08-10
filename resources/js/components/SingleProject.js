import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {hasErrorFor} from "./HasErrorFor.js";
import ErrorFor from "./ErrorFor.js";

const SingleProject = ({ props }) => {
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(async () => {
        const projectId = props.match.params.id;
        const result = await axios(`/api/projects/${projectId}`);
        setProject(result .data);
        setTasks(result .data.tasks)
    }, []);

    const handleMarkProjectAsCompleted = () => {
        axios.put(`/api/projects/${project.id}`)
            .then(response => props.history.push('/'))
    };

    const handleFieldChange = event => {
        setTitle(event.target.value)
    };

    const handleAddNewTask = event => {
        event.preventDefault();

        const task = {
            title,
            project_id: project.id
        };

        axios.post('/api/tasks', task)
            .then(response => {
                // clear form input
                setTitle('');
                setTasks(tasks, ...response.data);
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    };


    const handleMarkAsCompleted = taskId => {
        axios.put(`/api/tasks/${taskId}`)
            .then(response => {
                const filtered = tasks.filter(task => task.id !== taskId);
                setTasks(filtered)
            })
    };



    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>{project.name}</div>
                        <div className='card-body'>
                            <p>{project.description}</p>

                            <button
                                className='btn btn-primary btn-sm'
                                onClick={handleMarkProjectAsCompleted}
                            >
                                Mark as completed
                            </button>
                            <hr/>
                            <form onSubmit={handleAddNewTask}>
                                <div className='input-group'>
                                    <input
                                        type='text'
                                        name='title'
                                        className={`form-control ${hasErrorFor('title', errors) ? 'is_invalid' : ''}`}
                                        placeholder='Task title'
                                        value={title}
                                        onChange={handleFieldChange}
                                    />
                                    <div className='input-group-append'>
                                        <button className='btn btn-primary'>Add</button>
                                    </div>
                                    <ErrorFor hasError={errors} field='title'/>
                                </div>
                            </form>

                            <ul className='list-group mt-3'>
                                {tasks.map(task => (
                                    <li
                                        className='list-group-item d-flex justify-content-between align-items-center'
                                        key={task.id}
                                    >
                                        {task.title}
                                        <button
                                            className='btn btn-primary btn-sm'
                                            onClick={() => handleMarkAsCompleted(task.id)}
                                        >
                                            Mark as completed
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SingleProject;
