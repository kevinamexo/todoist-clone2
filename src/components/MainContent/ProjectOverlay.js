import React, {useState, useEffect } from 'react'
import './ProjectOverlay.css'
import {useSelectedProjectValue, useShowAddProjectValue, useTimeFilterValue} from '../../context'
import {useFilteredTasks,useTasks} from '../../firebase-hooks'
import Task from '../Sidebar/Projects/Task'
import {AiOutlinePlus} from 'react-icons/ai'
import {useOpenSidebarValue} from '../../context'
import AddProject from '../../AddProject'


import AddTaskMain from '../Sidebar/Projects/AddTaskMain/AddTaskMain'
const ProjectOverlay=()=> {

    const {selectedProject} = useSelectedProjectValue()
    const {active,setActive}= useTimeFilterValue()
    const {tasks, setTasks}= useTasks(selectedProject, active)
    const {filteredTasks,timeTasks}= useFilteredTasks(selectedProject)
    const {openSidebar} = useOpenSidebarValue()
    const [showAddTask, setShowAddTask]= useState(false)
    const {showAddProject,setShowAddProject}= useShowAddProjectValue()
    
    
    console.log(selectedProject)
    return(
        <>

            <div className={openSidebar?"project-overlay-container":"project-overlay-container-full"}>
                <div className="p-o-header">{selectedProject?selectedProject.name:''}</div>
                <div className="pO_task-list">
                    <ul className="project-overlay__tasks">
                        {filteredTasks.map(task=>(
                            <li className="project-overlay-task" key={task.taskId}>
                                <Task task={task}/>
                            </li>    
                        ))}

                    </ul>
                </div>
            
                {showAddTask? 
                    <AddTaskMain setShowAddTask={setShowAddTask}/>:
                    <div className="pO-add-task"
                        role="button"
                        tabIndex={0}
                        onClick={()=>setShowAddTask(true)}
                    >
                        <span>
                            <AiOutlinePlus className="pO-add-task-plus"/>
                            <p className="pO-add-task-name">Add Task</p>
                        </span>
                    </div>
                
                }   

            </div>
            {showAddProject &&<AddProject/>}   
    </>
    )
}

export default ProjectOverlay


