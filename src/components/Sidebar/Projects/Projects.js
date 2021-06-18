import React, { useState } from 'react';
// import PropTypes from 'prop-types';s
import { useSelectedProjectValue, useProjectsValue,useTimeFilterValue} from '../../../context';
import  IndividualProject  from './IndividualProject';
import './Projects.css'
const Projects = ({ activeValue = null }) => {
  const [activeEl, setActiveEl] = useState(activeValue);
  const { selectedProject,setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const {active,setActive}=useTimeFilterValue()
  console.log(projects)

   return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActiveEl(project.projectId);
            setSelectedProject(project);
            setActive(null)
            console.log(project.name)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActiveEl(project.projectId);
              setSelectedProject(project);
              setActive(null)
              console.log(project.name)
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};


export default Projects