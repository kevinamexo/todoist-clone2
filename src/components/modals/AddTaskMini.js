import React,{useState, useEffect,useRef}  from 'react'
import ReactDom from 'react-dom'
import {firebase} from '../../firebase'
import {IoCalendarClearOutline, IoIosCalendar} from 'react-icons/io'
import {IoCalendarOutline} from 'react-icons/io5'
import {AiOutlineClose} from 'react-icons/ai'
import {MdLabelOutline} from 'react-icons/md'
import moment from 'moment'
import {useGetAllTasks,useFilterTasks} from './../../firebase-hooks'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer, Zoom, Bounce} from 'react-toastify'
import { useTimeFilterValue,useSelectedTimeFilterValue, useSelectedProjectValue, useShowQuickAddTaskValue} from '../../context'
import { VscInbox } from 'react-icons/vsc'
import {set, useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
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
    const {showQuickAddTask,setShowQuickAddTask}=useShowQuickAddTaskValue()
    const quickAddTaskRef= useRef();

    const handleShowQuickAddTask=(e)=>{
        if(quickAddTaskRef.current.contains(e.target)) return

        setShowQuickAddTask(false)
    }

    useEffect(()=>{
        document.addEventListener('mousedown',handleShowQuickAddTask)

        return ()=> document.removeEventListener('mousedown',handleShowQuickAddTask)
    },[])
    const taskNameSchema= yup.object().shape({
        email: yup.string().required("Task name is required"),
    })

    const {register, handleSubmit, formState:{errors}}= useForm({
        resolver:yupResolver(taskNameSchema)
    })

    const addtask=(e)=>{
        e.preventDefault()
        let projectId= project||selectedProject||null;
        let filterDate = ''
    
        if(activeDateButton==='today'){
            filterDate = moment().format('DD/MM/YYYY')
        }else if (activeDateButton==='inbox'){
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
                    setShowQuickAddTask(false)
                    setFilteredTasks([...filteredTasks])
                    setTask('')
                    setProject('')
          
                    
                }).catch((error)=>{
                    console.log(error)
                    toast.error(error)
                })

        )
    
    }


    if (!showQuickAddTask) return null
    return ReactDom.createPortal(
        <div className="quick-add-task-container">
            <ToastContainer/>
            <div ref={quickAddTaskRef} className="quick-add-task-modal">
                <AiOutlineClose 
                    className="close-quick-add-task"
                    onClick={()=>setShowQuickAddTask(false)}
                />  
                <label htmlFor="add task">Quick Add Task</label>
                <form className="quick-add-task-form" onSubmit={addtask}>
                    <div className="quick-add-task-form-group">
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
                                    className={activeDateButton==='today'? 'active-quick-add-task-timeFilter-today':'quick-add-task-timeFilter'} 
                                    onClick={()=>{
                                        
                                        setActiveDateButton('today')
                                        
                                        setTaskDate(moment().format('DD/MM/YYYY'))   
                                        
                                        setDateSet(true)
                                        } 

                                    }

                                    type="button"
                                ><IoCalendarOutline/><p>Today</p></button>
                                
                                <button
                                     className={activeDateButton==='inbox'? 'active-quick-add-task-timeFilter-inbox':'quick-add-task-timeFilter'} 
                                    onClick={()=>{
                                        
                                        setActiveDateButton('inbox')
                                        setTaskDate('')                                   
                                        setDateSet(false)
                                    
                                    }}
                                    type="button"
                                ><VscInbox/><p>Inbox</p></button>
                            </span>
                        </div>

                        <p>{errors.text?.message}</p>
                    </div>    
                    <button className="quickAddTask_add-btn">Add Task</button>
                </form>
            </div>            
        </div>,
            document.getElementById('quickAddTask-portal')
    )
}

export default AddTaskMini
