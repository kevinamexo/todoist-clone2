import React, {useState} from 'react'
// import useProjects from '../../../firebase-hooks'
import {useProjectsValue, useSelectedProjectValue} from '../../../context'


function Projects() {
    const {projects} =useProjectsValue()
    const [active, setActive] = useState(null)
    const {setSelectedProject} =useSelectedProjectValue()
    return (
        <div>
            <ul>
                {projects.map(project=>(
                    <li
                        key={project.projectId}
                        className={active=== project.projectId?
                                    'active sidebar_project':
                                    'sidebar_project'
                        }
                    >
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={()=>{
                                setActive(project.projectId)
                                setSelectedProject(project.projectId);
                                }
                            }
                            aria-label={`Select ${project.name} as the active project `}
                            onKeyDown={(e)=>{
                                if (e.key==='Enter'){
                                    setActive(project.projectId)
                                    setSelectedProject(project.projectId);
                            
                                }
                            }}
                        >
                            <Project project={project}/>
                        </div>
                    
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default Projects
