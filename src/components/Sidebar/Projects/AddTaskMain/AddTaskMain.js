import React, {useState} from 'react'
import {IoCalendarClearOutline, IoIosCalendar} from 'react-icons/io'
import {MdLabelOutline} from 'react-icons/md'
import moment from 'moment'
import './AddTaskMain.css'
import {firebase} from '../../../../firebase'
import { useSelectedProjectValue} from '../../../../context'
import { VscInbox } from 'react-icons/vsc'
import {generatePushId} from '../../../../helpers'


function AddTaskMain({setShowAddTask}) {
    const [task, setTask]= useState('')
    const [taskDate, setTaskDate]= useState('')
    const [project, setProject]= useState('')
    const {selectedProject}= useSelectedProjectValue()
    const [dateSet,setDateSet]= useState(false)
    const [activeDateButton, setActiveDateButton]= useState('')
    


    
    const addtask=()=>{
        let projectId= project||selectedProject
        let filterDate = ''
        projectId= selectedProject? selectedProject.projectId: ''
        
        
        // if(projectId === 'TODAY'){
        //     filterDate= moment().format('DD/MM/YYYY')
        // } else{
        //     filterDate=''
        // }
    
        return(
            task&&
            projectId&&
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived:false,
                    date:dateSet? taskDate:filterDate,
                    projectId,
                    task,
                    userId: '2irjij20349cuu204'
                })
                .then(()=>{
                    console.log('adding')
                    setTask('')
                    setProject('')
                    setShowAddTask(false)
                })

        )
    
    }

    

    return (
        <>
            <h1>{taskDate}</h1>
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
                    <span className={activeDateButton==='today' ?"atm-calendar active": "atm-calendar"}
                        role="button"
                        tabIndex={0}
                        onClick={()=>{
                            if(activeDateButton==='today'){
                                
                                console.log('clearing button')
                                setTaskDate('')
                                setActiveDateButton('')
                                setDateSet(false)
                                
                            } else{
                                
                                setTaskDate(moment().format('DD/MM/YYYY'))
                                console.log(taskDate)
                                setActiveDateButton('today')
                                setDateSet(true)
                               
                            }      
                            }
                        }

                    >
                        <IoIosCalendar/>
                        <p>Today</p>
                    </span>
                    <span className= {activeDateButton==="inbox" ?"atm-inbox active": "atm-inbox"}
                        role="button"
                        tabIndex={0}
                        onClick={()=>{
                            if(activeDateButton==='inbox'){
                                setTaskDate('')
                                console.log('clearing button')
                                setActiveDateButton('')
                                setDateSet(false)
                            } else{
                                setTaskDate('')
                                setActiveDateButton('inbox')
                                setDateSet(true)
                               
                            }      
                            }
                        }
                          

                    >
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
