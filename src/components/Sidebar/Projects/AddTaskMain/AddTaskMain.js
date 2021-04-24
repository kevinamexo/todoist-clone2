import React, {useState} from 'react'
import {IoCalendarClearOutline, IoIosCalendar} from 'react-icons/io'
import {MdLabelOutline} from 'react-icons/md'
import moment from 'moment'
import './AddTaskMain.css'
import {firebase} from '../../../../firebase'
import { useSelectedProjectValue } from '../../../../context'
import { VscInbox } from 'react-icons/vsc'



function AddTaskMain({setShowAddTask}) {
    const [task, setTask]= useState('')
    const [taskDate, setTaskDate]= useState('')
    const [project, setProject]= useState('')
    const {selectedProject}= useSelectedProjectValue()
    
    const addtask=()=>{
        const projectId= project||selectedProject
        let filterDate = ''
        if(projectId === 'TODAY'){
            filterDate= moment().format('DD/MMY/YYYY')
        } else{
            filterDate=""
        }
    
        return(
            task&&
            projectId&&
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived:false,
                    date: filterDate||taskDate,
                    task,
                    projectId,
                    userId: '2irjij20349cuu204'
                })
                .then(()=>{
                    setTask('')
                    setProject('')
                    setShowAddTask(false)
                })
        )
    
    }

    

    return (
        <>
            <div className="add-task-main">
                <input 
                    className="add-task-main__taskName"
                    name="taskName" 
                    value={task}
                    type="text" 
                    onChange={(e)=> setTask(e.target.value)}
                    aria-label="Enter your task"
                    placeholder="Enter your task name here"
                    data-testid="add-task-content"
                />
                <div className="atm-timeFilter-icons">
                    <span className="atm-calendar">
                        <IoIosCalendar/>
                        <p>Today</p>
                    </span>
                    <span className="atm-inbox">
                        <VscInbox/>
                        <p>Inbox</p>
                    </span>
                    <div className="atm-label">
                        <MdLabelOutline className="atm-label-icon" />
                    </div>
            </div>
        </div>
        <div className="atm-submit-cancel">
            <button 
                className="atm-submit-task"
                tabIndex={0}
                onKeyDown={(e)=>{
                    if (e.key==="Enter"){
                        addtask()
                    }
                }}
                onClick={()=>addtask()}
            >
                Add Task
            </button>
            <p 
                className="atm-cancel-submit-task"
                tabIndex={0}
                onKeyDown={(e)=>{
                    if (e.key==="Enter"){
                        setTask('')
                        setTaskDate('')
                        setShowAddTask(false)
                    }
                }}
                onClick={()=>setShowAddTask(false)}
            >
                Cancel
            </p>

        </div>
        
    </>
    )
}

export default AddTaskMain
