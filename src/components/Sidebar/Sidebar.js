import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import {VscInbox} from 'react-icons/vsc'
import {IoTodayOutline, IoCalendarOutline} from 'react-icons/io5'
import {useOpenSidebarValue, useShowAddProjectValue} from '../../context'
import {AiOutlneArrowRight, AiOutlineDown, AiOutlineRight,AiOutlinePlus} from 'react-icons/ai'
import Projects from './Projects/Projects'
import {useSelectedProjectValue, useTasksValue, useTimeFilterValue} from '../../context'
import {Link} from 'react-router-dom'
import AddProject from '../../AddProject'
const Sidebar=()=> {

    const [openProjects, setOpenProjects]=useState(false)
    const [openLabels, setOpenLabels]= useState(false)
    const [openFilters, setOpenFilters]= useState(false)
    const {active,setActive}= useTimeFilterValue()
    const {openSidebar} = useOpenSidebarValue()
    const {showAddProject,setShowAddProject}= useShowAddProjectValue()
    const handleOpenProjects=()=>setOpenProjects(!openProjects)
    const handleOpenLabels=()=>setOpenLabels(!openLabels)
    const handleOpenFilters=()=>setOpenFilters(!openFilters)
    const {allTasks,setAllTasks, totalTasks, setTotalTasks}=useTasksValue()
    const {selectedProject, setSelectedProject}= useSelectedProjectValue()

    
    
    // console.log(openSidebar)
    return (
        <>
            <div className={`sidebar ${openSidebar ?"show":"hidden-sidebar"}`}>
                <ul className="sidebar__times">
                    <li className ={`sidebar-inbox ${active==='inbox'? 'active': undefined}`}
                        onClick={()=>{
                            setActive('inbox')
                            setSelectedProject(null)
                            }}

                    >
                        <span className="sidebar-icon"><VscInbox/></span>
                        <span className="time-label">Inbox </span>
                        <span className="no_tasks">{allTasks.length} </span>
                    </li>
                    <li className= {`sidebar-today ${active==='today'? 'active': undefined}`}
                        onClick={()=>{
                            setActive('today')
                            setSelectedProject(null)
                            
                            }}
                        >
                        <span className="sidebar-icon"><IoTodayOutline/></span>
                        <span  className="time-label">Today</span>
                    </li>
                    <li className={`sidebar-upcoming ${active==='upcoming'? 'active': undefined}`}
                        onClick={()=>{
                            setActive('upcoming')
                            // setSelectedProject(null)
                        }}

                    >
                        <span className="sidebar-icon"><IoCalendarOutline/></span>
                        <span className="time-label">Upcoming</span>  
                    </li>
                </ul>



                <div className="sidebar__options">
                    <div className="sidebar-projects">
                        <div className="sidebar-projects-icons">
                            <span className="open-icon"
                                onClick={handleOpenProjects}
                            >
                                {openProjects?<AiOutlineDown/>: <AiOutlineRight/>}
                            </span>
                            <span className="sidebar__option-label">
                                Projects    
                            </span>

                    
                            <span className="sidebar__add-project"
                                onClick={()=>setShowAddProject(true)}
                            >
                                <AiOutlinePlus/>
                            </span>
                            
                          
                        </div>

                        {openProjects && (
                            <ul className="projects">
                                <Projects/>
                            </ul>
                            )
                        }
                        
                        

                    
                    </div>






                    <div className="sidebar-labels">
                        <span className="open-icon"
                            onClick={handleOpenLabels}
                        >
                            {openLabels?<AiOutlineDown/>: <AiOutlineRight/>}
                        </span>
                        <span className="sidebar__option-label">
                            Labels
                        </span>

                        <span className="sidebar__add-project">
                            <AiOutlinePlus/>
                        </span>

                        <ul></ul>
                    </div>
                    <div className="sidebar-filters">
                        <span className="open-icon"
                            onClick={handleOpenFilters}
                        >
                            {openFilters?<AiOutlineDown/>: <AiOutlineRight/>}
                        </span>
                        <span className="sidebar__option-label">
                            Filters
                        </span>

                        <span className="sidebar__add-project">
                            <AiOutlinePlus/>
                        </span>

                    
                    </div>
                    
                
                
                </div>

                

            
                
            </div>

            {/* {showAddProject && <AddProject/>} */}
            

        </>
    )
}
export default Sidebar
