import React, {useState, useRef, useEffect} from 'react'

import  {BsArchive, BsTrash} from 'react-icons/bs'
import './SidebarProjectOptions.css'

function SidebarProjectOptions({project, setOpenSidebarProjectOptions, setShowConfirmDelete}) {
    const projectOptionsMenu= useRef()
    const handleSidebarProjectOptionsMenu=e=>{
        if (projectOptionsMenu.current.contains(e.target)) return

        setOpenSidebarProjectOptions(false)  // const addtask=()=>{
    //     let projectId= project||selectedProject
    //     let filterDate = ''
    //     projectId= selectedProject? selectedProject.projectId: ''
        
        
    //     // if(projectId === 'TODAY'){
    //     //     filterDate= moment().format('DD/MM/YYYY')
    //     // } else{
    //     //     filterDate=''
    //     // }
    
    //     return(
    //         task&&
    //         projectId&&
    //         firebase
    //             .firestore()
    //             .collection('tasks')
    //             .add({
    //                 archived:false,
    //                 date:dateSet? taskDate:filterDate,
    //                 projectId,
    //                 task,
    //                 userId: '2irjij20349cuu204',
    //                 taskId:taskId,
    //             })
    //             .then(()=>{
    //                 console.log('adding')
    //                 setTask('')
    //                 setProject('')
    //                 setShowAddTask(false)
    //             })

    //     )
    
    // }
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
                <li
                    onClick={()=>setShowConfirmDelete(true)}
                    tabIndex={0}
                    role="button"
                >
                    <span><BsTrash/></span>
                    <span>Delete Project</span>
                    
                </li>
                
            </ul>
            
        </div>
    )
}

export default SidebarProjectOptions
