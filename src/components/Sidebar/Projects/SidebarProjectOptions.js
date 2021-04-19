import React, {useState, useRef, useEffect} from 'react'

import  {BsArchive, BsTrash} from 'react-icons/bs'
import './SidebarProjectOptions.css'

function SidebarProjectOptions({project, setOpenSidebarProjectOptions}) {
    const projectOptionsMenu= useRef()
    const handleSidebarProjectOptionsMenu=e=>{
        if (projectOptionsMenu.current.contains(e.target)) return

        setOpenSidebarProjectOptions(false)
    }

    useEffect(()=>{
        document.addEventListener('mousedown', handleSidebarProjectOptionsMenu)
        return ()=>document.removeEventListener('mousedown', handleSidebarProjectOptionsMenu)
    }, [])
    return (
        <div ref={projectOptionsMenu} className="sidebar-project-options-container">
            <ul className="sidebar-project-options">
                <li>
                    <span><BsArchive/></span>
                    <span>Archive Project</span>
                    
                </li>
                <li>
                    <span><BsTrash/></span>
                    <span>Delete Project</span>
                    
                </li>
                
            </ul>
            
        </div>
    )
}

export default SidebarProjectOptions
