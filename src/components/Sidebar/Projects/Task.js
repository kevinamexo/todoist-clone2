import React, {useState} from 'react'
import {FaRegCheckCircle, FaRegCircle} from 'react-icons/fa'
import './Task.css'

function Task({task}) {
    const [edit, setToggleEdit]= useState(false)
    
    return (
        <div className="pO-task"> 
            <FaRegCircle className="pO-task__taskCheck"/>
            <span className="pO-task__taskName">{task.task}</span>
        </div>
    )
}

export default Task
