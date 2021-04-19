import React from 'react'
import './ProjectOverlay.css'
import {useSelectedProjectValue} from '../../context'
import {useTasks} from '../../firebase-hooks'

const ProjectOverlay=()=> {

    const {selectedProject} = useSelectedProjectValue()
    const {tasks, setTasks}= useTasks(selectedProject)

    return (
        <div className="project-overlay-container">
            <h3 className="p-o-container">{selectedProject.name}</h3>
            <ul className="project-overlay__tasks">
            {tasks.map(task=>(
                <li className="project-overlay-task">
                    <p>task</p>
                </li>    
            ))}
           
            </ul>
        </div>
    )
}

export default ProjectOverlay


