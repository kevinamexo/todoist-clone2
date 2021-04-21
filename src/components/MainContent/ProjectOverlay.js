import React, { useEffect } from 'react'
import './ProjectOverlay.css'
import {useSelectedProjectValue} from '../../context'
import {useTasks} from '../../firebase-hooks'
import Task from '../Sidebar/Projects/Task'
import {AiOutlinePlus} from 'react-icons/ai'
const ProjectOverlay=()=> {

    const {selectedProject} = useSelectedProjectValue()
    const {tasks, setTasks}= useTasks(selectedProject.projectId)
    
    return (
        <div className="project-overlay-container">
            <div className="p-o-header">{selectedProject.name}</div>
            <div className="pO_task-list">
                <ul className="project-overlay__tasks">
                    {tasks.map(task=>(
                        <li className="project-overlay-task">
                            <Task task={task}/>
                        </li>    
                    ))}

                </ul>
            </div>
            <div className="pO-add-task">
                <span>
                    <AiOutlinePlus className="pO-add-task-plus"/>
                    <p className="pO-add-task-name">Add Task</p>
                </span>
            </div>

        </div>
    )
}

export default ProjectOverlay


