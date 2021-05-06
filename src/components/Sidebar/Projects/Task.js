import React, {useState} from 'react'
import {firebase} from '../../../firebase'
import {FaRegCheckCircle, FaRegCircle} from 'react-icons/fa'
import {GrCheckmark} from 'react-icons/gr'
import {useTasks} from '../../../firebase-hooks'
import {useTasksValue, useProjectsValue} from '../../../context'
import './Task.css'

function Task({task}) {
    const [edit, setToggleEdit]= useState(false)
    const [displayCheck, setDisplayCheck]= useState(false)
    const {allTasks, setAllTasks}= useTasksValue()
    const {projects}= useProjectsValue()
    
    
    
    const deleteTask=(docId)=>{
        firebase
            .firestore()
            .collection('tasks')
            .doc(docId)  
            .delete()
            .then(()=>{
                setAllTasks([...allTasks])
                console.log('deleted')  
            })
    }
    
    return (
        <div className="pO-task"> 
            <span
                className="pO-task__taskCheck"
                onMouseEnter={(e)=>setDisplayCheck(true)}
                onMouseLeave={(e)=> setDisplayCheck(false)}
                role="button"
                tabIndex={0}
                onClick={()=>{
                    deleteTask(task.id)
                    console.log(task.id)
                }
                }
            >
                {displayCheck? <GrCheckmark/>: null} 
            </span>
            <span className="pO-task__taskName">{task.task}</span>
           
        </div>
    )
}

export default Task
