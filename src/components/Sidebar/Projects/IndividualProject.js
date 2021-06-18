import React, {useState, useRef, useEffect} from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import {GrCheckmark} from 'react-icons/gr'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {firebase} from '../../../firebase'
import './Project.css'
import {useProjectsValue, useSelectedProjectValue} from '../../../context'
import SidebarProjectOptions from './SidebarProjectOptions'


export const IndividualProject= ({project})=> {


    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [showSidebarProjectOptions, setShowSidebarProjectOptions]= useState(false)
    const [openSidebarProjectOptions, setOpenSidebarProjectOptions]= useState(false)
    const {projects, setProjects}= useProjectsValue()
    const {setSelectedProject}= useSelectedProjectValue()
    const deleteModalRef= useRef()

   

    const deleteProject=(docId)=>{
        firebase
            .firestore()
            .collection('projects')
            .doc(docId)
            .delete()
            .then(()=>{
                setProjects([...projects])
                setSelectedProject('INBOX')

            })
    }

    const handleDeleteModal=e=>{
        if (deleteModalRef.current.contains(e.target)) return
        
        setShowConfirmDelete(false)
        
    }
    useEffect(()=>{
        document.addEventListener("mousedown", handleDeleteModal)
        
        return () => document.removeEventListener("mousedown", handleDeleteModal)
    },[])


    return (
        <div className="sidebar__individual-project"
            onMouseEnter={()=>{
                setShowSidebarProjectOptions(true)
                // console.log(showSidebarProjectOptions)
                }
            
            }
            onMouseLeave={()=>setShowSidebarProjectOptions(false)}
            tabIndex={0}
        >
            <span className="project__dot-container">
                <div className="project-dot" style={{backgroundColor:project.color||'rgb(248, 62, 62)'}} ></div>
            </span>
            <span className="sidebar__project-name" >{project.name}</span>
            
            <div className="sidebar__project-delete-span"
                onClick={()=>{
                    setOpenSidebarProjectOptions(!openSidebarProjectOptions)
                    console.log(showConfirmDelete)
                }
                }
            >
                <BiDotsHorizontalRounded/>

                   
            </div>

            {openSidebarProjectOptions && <SidebarProjectOptions project={project} setOpenSidebarProjectOptions={setOpenSidebarProjectOptions} setShowConfirmDelete={setShowConfirmDelete}/>}

           
            
            <div ref={deleteModalRef} className={showConfirmDelete? "delete-modal":"hidden"} ref={deleteModalRef}>
                <p>Are you sure you want to delete this project?</p>
                <span className="delete-modal-buttons">
                    <button onClick={()=>deleteProject(project.docId)}>Delete</button>
                    <button onClick={()=> setShowConfirmDelete(false)}>Cancel</button>
                </span>
                
            </div>           
            
            
            
        </div>
    )
}

export default IndividualProject
