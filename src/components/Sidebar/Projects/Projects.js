import React, { useState } from 'react';
// import PropTypes from 'prop-types';s
import { useSelectedProjectValue, useProjectsValue} from '../../../context';
import  IndividualProject  from './IndividualProject';
import './Projects.css'
const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { selectedProject,setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
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
            setActive(project.projectId);
            setSelectedProject(project);
            console.log(project.name)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project);
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