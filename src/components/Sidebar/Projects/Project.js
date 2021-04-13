import React, {useState} from 'react'
import {FaTrashAlt} from 'react-icons'
import {firebase} from '../../../firebase'
import {useProjectsValue, useSelectedProjectValue} from '../../../context'
function Project({project}) {

    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const {projects, setProjects}= useProjectsValue()
    const {setSelectedProjects}= useSelectedProjectValue()
        const deleteProject =(docId)=>{
            firebase
                .firestore()
                .collection('projects')
                .doc(docId)
                .delete()
                .then(()=>{
                    setProjects([...projects])
                    setSelectedProjects('INBOX')
                })
    }
    return (
        <div>
            <span className="project__dot"></span>
            <span className="sidebar__project-name">{project.name}</span>
            <span
                className={deleteProject(project.docId)}
                role="button"
                tabIndex={0}
                onClick={()=>setShowConfirmDelete(!showConfirmDelete)}
                onKeyDown={()=>setShowConfirmDelete(!showConfirmDelete)}
            >
                <div className="confirm-delete-message">
                    <p>Are you sure you want to delete this project? </p>
                    <div className="sidebar-delete-button-container">
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={()=>deleteProject(project.docId)}
                            onClick={(e)=>{
                                if (e.key==="Enter") deleteProject(project.docId)}}
                        >

                        </span>

                    </div>
                </div>

            </span>
            
        </div>
    )
}

export default Project
