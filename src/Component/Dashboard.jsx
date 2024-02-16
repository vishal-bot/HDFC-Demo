import React, { useState, useEffect } from 'react';

import axios from 'axios';

let config = {
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
    }
}


const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [newProject, setNewProject] = useState({
        project_id: '',

        project_name: '',

        description: '',

        start_date: '',

        employee_name: '',

        designation: ''

    });

    const [editingProject, setEditingProject] = useState(null);

    const [sortBy, setSortBy] = useState('');

    const [isAsc, setIsAsc] = useState(true);

    const [viewMode, setViewMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;
    const baseUrl = "https://hdfc-demo-backend.onrender.com";

    useEffect(() => {

        fetchProjects();

    }, []);

    const fetchProjects = async () => {

        try {

            const response = await axios.get(`${baseUrl}/projects`, config);

            setProjects(response.data);

        } catch (error) {

            console.error('Error fetching projects:', error);

        }

    };

    const handleSearch = (e) => {

        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleAddProject = () => {

        setShowModal(true);

        setEditingProject(null);

        setNewProject({

            project_name: '',

            description: '',

            start_date: '',

            employee_name: '',

            designation: ''

        });

    };

    const handleEditProject = (project) => {

        setShowModal(true);

        setEditingProject(project);

        setNewProject(project);

    };

    const handleDeleteProject = async (projectId) => {

        try {

            await axios.delete(`${baseUrl}/projects/${projectId}`, config);

            setProjects(projects.filter(project => project.project_id !== projectId));

        } catch (error) {

            console.error('Error deleting project:', error);

        }

    };

    const handleSaveProject = async () => {

        try {

            if (editingProject) {

                await axios.put(`${baseUrl}/projects/${editingProject.project_id}`, newProject, config);

                const updatedProjects = projects.map(project => {

                    if (project.project_id === editingProject.project_id) {

                        return newProject;

                    }

                    return project;

                });

                setProjects(updatedProjects);

            } else {

                const response = await axios.post(`${baseUrl}/projects', newProject, config);

                setProjects([...projects, response.data]);

            }

            setShowModal(false);

        } catch (error) {

            console.error('Error saving project:', error);

        }

    };


    const handleSort = (key) => {
        // setSortBy(key);
        setIsAsc(!isAsc);
        const sortedProjects = [...projects].sort((a, b) => {
            const valueA = a[key].toLowerCase();
            const valueB = b[key].toLowerCase();
            if (isAsc) {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
        setProjects(sortedProjects);
    };


    const handleViewMode = (mode) => {

        setViewMode(mode);

    };

    // Pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;


    // Filtered projects based on search term
    const filteredProjects = projects.filter(project =>
        Object.values(project).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination of filtered projects
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (

        <div className="w-full sm:px-6 md:px-8 lg:ps-72">

            <div className="container mx-auto p-4">
                <div className="mx-auto max-w-2xl mb-2 lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Project Management</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Manage all your work efficiently.
                    </p>
                </div>
                <hr />

                {/* Search input field */}

                <div className="flex space-x-4 mb-4 mt-4">
                    <div className='grow space-x-4'>
                        <input
                            type="text"
                            placeholder="Search projects"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border rounded-md px-3 py-2 w-3/6 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        {/* Sort button */}
                        <div className='flex border justify-end space-x-4 pl-8 pr-8'>
                            <button onClick={() => handleSort('project_name')}>
                                Sort {(isAsc ? '▲' : '▼')}
                            </button>

                            <button className={`flex items-center ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleViewMode('list')}>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">

                                    <path fillRule="evenodd" d="M2 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm16 5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zm-1 4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2z" clipRule="evenodd" />

                                </svg>

                            </button>

                            <button className={`flex items-center ${viewMode === 'card' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleViewMode('card')}>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">

                                    <path fillRule="evenodd" d="M4 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm0 8a1 1 0 0 1 1-1h10a1  1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm0 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Add new project button */}
                            {/* Add other filter options or statistics */}
                            <button onClick={handleAddProject} className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>Add New Project</button>
                        </div>
                    </div>

                </div>

                {/* Filter and view mode buttons */}

                {/* <div className="flex justify-between items-center mb-4">

                    <div className="flex space-x-4">
                        <button onClick={() => handleSort('employee_name')}>
                            Sort {(isAsc ? '▲' : '▼')}
                        </button>

                        <button className={`flex items-center ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleViewMode('list')}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">

                                <path fillRule="evenodd" d="M2 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm16 5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zm-1 4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2z" clipRule="evenodd" />

                            </svg>

                        </button>

                        <button className={`flex items-center ${viewMode === 'card' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleViewMode('card')}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">

                                <path fillRule="evenodd" d="M4 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm0 8a1 1 0 0 1 1-1h10a1  1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm0 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                    </div>

                    <button onClick={handleAddProject} className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>Add New Project</button>
                </div> */}
                <hr />

                {/* Modal */}
                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                                            <div className="mt-2">
                                                <form>
                                                    {/* Grid */}
                                                    <div className="grid sm:grid-cols-10 gap-2 sm:gap-4">
                                                        {/* End Col */}
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="af-project-title" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                                                Project Title
                                                            </label>
                                                        </div>
                                                        {/* End Col */}
                                                        {/* End Col */}
                                                        <div className="sm:col-span-8">
                                                            <input id="af-project-title"
                                                                type="text"
                                                                name="projectName"
                                                                value={newProject.project_name}
                                                                onChange={(e) => setNewProject({ ...newProject, project_name: e.target.value })}
                                                                className="py-2 px-3 pe-11 block w-full border-gray-200 border-2 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                                placeholder="Project Name" />
                                                        </div>
                                                        {/* End Col */}
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="af-description" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                                                Description
                                                            </label>
                                                        </div>
                                                        {/* End Col */}
                                                        <div className="sm:col-span-8">
                                                            <textarea id="af-description"
                                                                className="py-2 px-3 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                                rows={2}
                                                                placeholder="Project Description"
                                                                name="description"
                                                                value={newProject.description}
                                                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                                            />
                                                        </div>
                                                        {/* End Col */}
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="af-description" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                                                Start Date
                                                            </label>
                                                        </div>
                                                        {/* End Col */}
                                                        <div className="sm:col-span-8">
                                                            <input
                                                                type="date"
                                                                className="py-2 px-3 pe-11 block w-full border-gray-200 border-2 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                                name="startDate"
                                                                value={newProject.start_date}
                                                                onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value })}
                                                            />
                                                        </div>
                                                        {/* End Col */}
                                                        <div class="sm:col-span-2">
                                                            <label htmlFor="af-account-full-name" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                                                Employee Name
                                                            </label>
                                                        </div>
                                                        {/* End Col */}
                                                        <div class="sm:col-span-8">
                                                            <div class="sm:flex">
                                                                <input id="af-account-full-name"
                                                                    type="text"
                                                                    class="py-2 px-3 pe-11 block w-full border-2 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                                    placeholder="Vishal"
                                                                    name="firstName"
                                                                    value={newProject.employee_name}
                                                                    onChange={(e) => setNewProject({ ...newProject, employee_name: e.target.value })} />
                                                                <input
                                                                    type="text"
                                                                    class="py-2 px-3 pe-11 block w-full border-2 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                                    placeholder="Singh"
                                                                    value={newProject.employee_name}
                                                                    onChange={(e) => setNewProject({ ...newProject, employee_name: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        {/* End Col */}
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="af-project-title" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                                                Designation
                                                            </label>
                                                        </div>
                                                        {/* End Col */}
                                                        <div className="sm:col-span-8">
                                                            <input id="af-project-title"
                                                                type="text"
                                                                name="designation"
                                                                value={newProject.designation}
                                                                onChange={(e) => setNewProject({ ...newProject, designation: e.target.value })}
                                                                className="py-2 px-3 pe-11 block w-full border-gray-200 border-2 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                                placeholder="Designation" />
                                                        </div>
                                                        {/* End Col */}
                                                    </div>
                                                    {/* End Grid */}

                                                </form>
                                                {/* Add other input fields for project details */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={handleSaveProject}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* List of projects */}
                <div>
                    {currentProjects.filter(project =>
                        Object.values(project).some(value =>
                            String(value).toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    ).map(project => (
                        <div key={project.project_id} className="">
                            {viewMode === 'list' && (
                                <div className="mt-5 mx-auto border rounded-md p-4">
                                    <h2 className="text-lg font-bold">{project.project_name}</h2>
                                    <p>{project.description}</p>
                                    <p>Start Date: {project.start_date}</p>
                                    <p>Employee Name: {project.employee_name}</p>
                                    <p>Designation: {project.designation}</p>
                                    <div className="flex justify-end mt-2">
                                        <button onClick={() => handleEditProject(project)} className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
                                        <button onClick={() => handleDeleteProject(project.project_id)} className="text-red-500 hover:text-red-700">Delete</button>
                                    </div>
                                </div>
                            )}
                            {viewMode === 'card' && (
                                <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-800 pt-8 sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                    <article className="flex max-w-xl flex-col border-2 p-4 items-start justify-between">
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={project.start_date} className="text-gray-500">
                                                {project.start_date}
                                            </time>
                                        </div>
                                        <div className="group">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                <a href='#'>
                                                    <span className="inset-0" />
                                                    {project.project_name}
                                                </a>
                                            </h3>
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{project.description}</p>
                                        </div>
                                        <div className="mt-8 flex items-center gap-x-4">
                                            <img src='#' alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900">
                                                    <a href='#'>
                                                        <span className="inset-0" />
                                                        {project.employee_name}
                                                    </a>
                                                </p>
                                                <p className="text-gray-600">{project.designation}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button onClick={() => handleEditProject(project)} className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
                                            <button onClick={() => handleDeleteProject(project.project_id)} className="text-red-500 hover:text-red-700">Delete</button>
                                        </div>
                                    </article>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
