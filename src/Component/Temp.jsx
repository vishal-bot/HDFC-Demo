import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Temp() {

  const [projects, setProjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [newProject, setNewProject] = useState({

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

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const response = await axios.get('http://localhost:2000/projects');

      setProjects(response.data);

    } catch (error) {

      console.error('Error fetching projects:', error);

    }

  };

  const handleSearch = (e) => {

    setSearchTerm(e.target.value);

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

      await axios.delete(`http://localhost:2000/projects/${projectId}`);

      setProjects(projects.filter(project => project.project_id !== projectId));

    } catch (error) {

      console.error('Error deleting project:', error);

    }

  };

  const handleSaveProject = async () => {

    try {

      if (editingProject) {

        await axios.put(`http://localhost:2000/projects/${editingProject.project_id}`, newProject);

        const updatedProjects = projects.map(project => {

          if (project.project_id === editingProject.project_id) {

            return newProject;

          }

          return project;

        });

        setProjects(updatedProjects);

      } else {

        const response = await axios.post('http://localhost:2000/projects', newProject);

        setProjects([...projects, response.data]);

      }

      setShowModal(false);

    } catch (error) {

      console.error('Error saving project:', error);

    }

  };

  const handleSort = (key) => {

    if (sortBy === key) {

      setIsAsc(!isAsc);

    } else {

      setIsAsc(true);

      setSortBy(key);

    }

  };

  const handleViewMode = (mode) => {

    setViewMode(mode);

  };

  return (

    <div className="w-full sm:px-6 md:px-8 lg:ps-72">
      <div className="container mx-auto p-4">

        <h1 className="text-3xl font-bold mb-4">Project Management Dashboard</h1>

        {/* Search input field */}

        <div className="mb-4">

          <input

            type="text"

            placeholder="Search projects"

            value={searchTerm}

            onChange={handleSearch}

            className="border rounded-md px-3 py-2 w-2/6 focus:outline-none focus:ring focus:border-blue-300"

          />

        </div>

        {/* Filter and view mode buttons */}

        <div className="flex justify-between items-center mb-4">

          <div className="flex space-x-4">

            <button className="flex items-center" onClick={() => handleSort('project_name')}>

              <span className="mr-2">Sort</span>

              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${sortBy === 'project_name' && 'text-blue-500 transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">

                <path d="M10 12a1 1 0 0 1-.7-.29l-4-4a1 1 0 0 1 1.4-1.42L10 9.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4A1 1 0 0 1 10 12z" />

              </svg>

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
            {/* Add other filter options or statistics */}
          </div>
          {/* Add new project button */}

          <button onClick={handleAddProject} className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-modal-signup'>Add New Project</button>
        </div>

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
          {projects.filter(project =>
            Object.values(project).some(value =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          ).map(project => (
            <div key={project.project_id} className="mb-4">
              {viewMode === 'list' && (
                <div className="border rounded-md p-4">
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
                <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                  <h2 className="text-lg font-bold mb-2">{project.project_name}</h2>
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
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Temp;