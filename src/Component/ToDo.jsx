import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './Dashboard.css';

function ToDo() {

    // Tasks (ToDo List) State
    const [toDo, setToDo] = useState([]);

    // Temp State
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState('');

    // Add task 
    const addTask = () => {
        if (newTask) {
            let num = toDo.length + 1;
            let newEntry = { id: num, title: newTask, status: false }
            setToDo([...toDo, newEntry]);
            setNewTask('');
        }
    }

    // Delete task 
    const deleteTask = (id) => {
        let newTasks = toDo.filter((task) => task.id !== id);
        setToDo(newTasks);
    }

    // mark task as done or completed
    const markDone = (id) => {
        const newTasks = toDo.map((task) => {
            if (task.id === id) {
                return ({ ...task, status: !task.status })
            }
            return task;
        });
        setToDo(newTasks);
    }

    // cancel update
    const cancelUpdate = () => {
        setUpdateData('');
    }

    // Change task for update
    const changeTask = (e) => {
        let newEntry = {
            id: updateData.id,
            title: e.target.value,
            status: updateData.status ? true : false
        }
        setUpdateData(newEntry);
    }

    // update task 
    const updateTask = () => {
        let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
        let updatedObject = [...filterRecords, updateData];
        setToDo(updatedObject);
        setUpdateData('');
    }


    return (
        <>
            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
            <div className="mx-auto pb-5">

                <div className="mx-auto border-b-2 pb-4 lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ToDo App</h2>
                </div>
                <div className="mx-auto py-6 px-6 sm:px-6 lg:px-8">
                    {updateData && updateData ? (
                        <>
                            <div className="flex flex-1 flex-row gap-3 ">

                                <div className="">
                                    <input className="placeholder:text-blue-400 bg-white block border border-blue-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Add Todos Name..." type="text" name="search" value={updateData && updateData.title}
                                        onChange={(e) => changeTask(e)} />
                                    {/* <input
                                value={updateData && updateData.title}
                                onChange={(e) => changeTask(e)}
                                className="form-control form-control-lg"
                            /> */}
                                </div>
                                <div className="col-auto">
                                    <button
                                        className="flex justify-center rounded-md bg-[#004C8F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004C8F]"
                                        onClick={updateTask}
                                    >Update</button>
                                </div>
                                <div>
                                    <button
                                        className="flex justify-center rounded-md bg-[#004C8F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004C8F]"
                                        onClick={cancelUpdate}
                                    >Cancel</button>
                                </div>
                            </div>
                            <br />
                        </>
                    ) : (
                        <>
                            <div className="flex flex-1 flex-row gap-3">
                                <div className="col">
                                    <input className="placeholder:text-[#004C8F] bg-white border border-[#004C8F] rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Add Todos Name..." type="text" name="search" value={newTask}
                                        onChange={e => setNewTask(e.target.value)}
                                    />
                                    {/* <input
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                className="form-control form-control-lg"
                            /> */}
                                </div>
                                <div className="col-auto">
                                    <button
                                        className="flex justify-center rounded-md bg-[#004C8F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004C8F]"
                                        onClick={addTask}
                                    >Add ToDo</button>
                                </div>
                            </div>
                            <br />
                        </>
                    )}


                    {/* If there are no to dos in state, display a message   */}
                    {toDo && toDo.length ? '' : 'No Projects...'}

                    {/* Show to dos   */}
                    {toDo && toDo
                        .sort((a, b) => a.id > b.id ? 1 : -1)
                        .map((task, index) => {
                            return (
                                <React.Fragment key={task.id}>

                                    <div className="col shadow-inner justify-center taskBg max-w-lg">

                                        <div
                                            // if task status is true, add class to this div named as done
                                            className={task.status ? 'done' : ''}
                                        >
                                            {/* Show number of task */}
                                            <span className="taskNumber">{index + 1}</span>
                                            <span className="taskText">{task.title}</span>
                                        </div>

                                        <div className="iconsWrap">
                                            <span
                                                onClick={(e) => markDone(task.id)}
                                                title="Completed / Not Completed"
                                            >
                                                <FontAwesomeIcon icon={faCircleCheck} />
                                            </span>

                                            {task.status ? null : (
                                                <span
                                                    title="Edit"
                                                    onClick={() => setUpdateData({ id: task.id, title: task.title, satus: task.status ? true : false })}
                                                >
                                                    <FontAwesomeIcon icon={faPen} />
                                                </span>
                                            )}

                                            <span
                                                onClick={() => deleteTask(task.id)}
                                                title="Delete"
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </span>
                                        </div>

                                    </div>

                                </React.Fragment>
                            );
                        })}
                </div>
            </div>
            </div>
        </>
    );
}

export default ToDo;