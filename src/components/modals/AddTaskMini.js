import React,{useState, useEffect,useRef}  from 'react'
import ReactDom from 'react-dom'
import {firebase} from './firebase'
import {IoCalendarClearOutline, IoIosCalendar} from 'react-icons/io'
import {MdLabelOutline} from 'react-icons/md'
import moment from 'moment'
import {useGetAllTasks,useFilterTasks} from './../../firebase-hooks'
import { useTimeFilterValue,useSelectedTimeFilterValue, useSelectedProjectValue} from '../../context'
import { VscInbox } from 'react-icons/vsc'
import {generatePushId, generateTaskPushID} from '../../helpers'
import './AddTaskMini.css'
import * as yup from "yup";
const AddTaskMini = () => {

    const [task, setTask]= useState('')
    const [taskDate, setTaskDate]= useState('')
    const [project, setProject]= useState('')
    const {selectedProject}= useSelectedProjectValue()
    const [dateSet,setDateSet]= useState(false)
    const [activeDateButton, setActiveDateButton]= useState('')
    const taskId= generatePushId()
    const {allTasks,setAllTasks}= useGetAllTasks()
    const {active}= useTimeFilterValue()
    const {filteredTasks,setFilteredTasks}=useFilterTasks()
  
    const taskNameSchema= yup.object().shape({
        email: yup.string().required("Task name is required"),
    })
    const addtask=(e)=>{
        

        e.preventDefault()
        let projectId= project||selectedProject||null;
        let filterDate = ''
    
        if(active==='today'){
            filterDate = moment().format('DD/MM/YYYY')
        }else if (active==='inbox'){
            filterDate=""
        }

       
        

        return(
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived:false,
                    date:dateSet? taskDate:filterDate,
                    projectId:selectedProject&&selectedProject.projectId||'',
                    task,
                    userId: '2irjij20349cuu204',
                    taskId:taskId,
                })
                .then(()=>{
                    setFilteredTasks([...filteredTasks])
                    setTask('')
                    setProject('')
                    setShowAddTask(false)
          
                    
                })

        )
    
    }


    if (!showAddProject) return null
    return ReactDom.createPortal(
        <div className="quick-add-task-container">
            <div className="quick-add-task-modal">
                <form className="quick-add-task-form" onSubmit={addtask}>
                    <div className="form-group">
                        <label htmlFor="add task">Quick Add Task</label>
                        <div className="quick-add-task-input">
                            <input 
                                type="text" 
                                value={task} 
                                onChange={(e)=> setTask(e.target.value)}
                                aria-label="Enter your task"
                                placeholder="Enter your task name here"
                                data-testid="add-task-content"
                                
                                />
                            <span>
                                <button
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
                                    }}
                                ><VscInbox/></button>
                                <button
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
                                ><MdLabelOutline/></button>
                                
                            </span>
                        </div>

                        <p>{errors.text?.message}</p>
                    </div>    
                </form>
            </div>            
        </div>
    )
}

export default AddTaskMini
