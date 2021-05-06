import React,{useState, useEffect,useRef}  from 'react'
import {firebase} from '../../../../firebase'
import {generatePushId} from '../../../../helpers'
import {useProjectsValue,useShowAddProjectValue} from '../../../../context'
import './AddProject.css'

function AddProject() {
    const addProjectRef= useRef()
    const [projectName, setProjectName]= useState('')
    const {projects, setProjects}= useProjectsValue()
    const {showAddProject,setShowAddProject}= useShowAddProjectValue()
    
    const projectId= generatePushId()

    
    const addProject=()=>{
        firebase.
            firestore()
            .collection('projects')
            .add({
                projectId,
                name: projectName,
                userId:'2irjij20349cuu204', 
            })
            .then(()=>{
                setProjects([...projects])
                setProjectName('')
                setShowAddProject(false)
            })
    
   
        
    }

    const handleShowAddProject=e=>{
        if (addProjectRef && addProjectRef.current.contains(e.target)) return

        setShowAddProject(false)

    }

    useEffect(()=>{
       document.addEventListener('mousedown', handleShowAddProject)

       return ()=>document.removeEventListener('mousedown', handleShowAddProject)
    },[])


  
    return (
        <>

            <div className="add-project">
                <form ref={addProjectRef} className="add-project__form">
                    <input name="Name"  value={projectName} onChange={e=>setProjectName(e.target.value)}/>
                    <button className="add-project__submit">
                        Add Project
                    </button>  

                </form>
                        
            </div>
        
            
        </>
    )
}
export default AddProject
