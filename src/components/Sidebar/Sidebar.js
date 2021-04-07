import React from 'react'
import './Sidebar.css'
import {VscInbox} from 'react-icons/vsc'
import {IoTodayOutline, IoCalendarOutline} from 'react-icons/io5'
import {useOpenSidebarValue} from '../../context'

function Sidebar() {
    
    const {openSidebar} = useOpenSidebarValue()
    console.log(openSidebar)
    return (
        <div className={`sidebar ${openSidebar ?"show":"hidden"}`}>
            <ul className="sidebar__times">
                <li className ="sidebar-inbox">
                    <span className="sidebar-icon"><VscInbox/></span>
                    <span className="time-label">Inbox</span>
                </li>
                <li className="sidebar-today">
                    <span className="sidebar-icon"><IoTodayOutline/></span>
                    <span  className="time-label">Today</span>
                </li>
                <li className="sidebar-upcoming">
                    <span className="sidebar-icon"><IoCalendarOutline/></span>
                    <span className="time-label">Upcoming</span>  
                </li>
            </ul>

            <ul>
                
            </ul>

            
        </div>
    )
}
export default Sidebar
