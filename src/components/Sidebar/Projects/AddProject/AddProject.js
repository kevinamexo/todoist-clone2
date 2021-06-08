import React,{useState, useEffect,useRef}  from 'react'
import {firebase} from '../../../../firebase'
import {generatePushId} from '../../../../helpers'
import {useProjectsValue,useShowAddProjectValue} from '../../../../context'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import './AddProject.css'
import {Colors as colors} from '../../../../helpers'
import { useForm } from 'react-hook-form'

function AddProject() {
    const addProjectRef= useRef()
    const [projectName, setProjectName]= useState('')
    const {projects, setProjects}= useProjectsValue()
    const {showAddProject,setShowAddProject}= useShowAddProjectValue()
    const {register, handleSubmit, errors}= useForm()
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

    // const handleShowAddProject=e=>{
    //     if (addProjectRef && addProjectRef.current.contains(e.target)) return

    //     setShowAddProject(false)

    // }

    // useEffect(()=>{
    //    document.addEventListener('mousedown', handleShowAddProject)

    //    return ()=>document.removeEventListener('mousedown', handleShowAddProject)
    // },[])

    function hexToRGB(h) {
        let r = 0, g = 0, b = 0;
      
        // 3 digits
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
      
        // 6 digits
        } else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }
        
        return "rgb("+ +r + "," + +g + "," + +b + ")";
      }
  
    return (
        <>

            <div className="add-project">
                <div className="add-project__modal">
                    <header className="add-project__header">
                        <p>Add Project</p>
                        <AiOutlineQuestionCircle className="add-project__question"/>
                        
                    </header>
                    <form ref={addProjectRef} className="add-project__form" onSubmit={addProject}>
                        <div className="form-group__name">
                            <label htmlFor="name">Name</label>
                            <input name="Name"  value={projectName} onChange={e=>setProjectName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="color"> Choose a Color</label>
                            <select className="add-project__color" {...register('color')}>
                                {Object.entries(colors).map(([color,hex]) => {
                                    let val=()=>JSON.stringify(color)
                                    return(
                                        <div>
                                            <option value={val}>
                                                {color}
                                            </option>
                                            <span style={{backgroundColor:color}}>.</span>
                                        </div>
                                )
                                })};
                                {/* {Object.entries(colors).map(([color,hex]) => {
                                    console.log(hexToRGB(hex))
                                    console.log(color)
                                })} */}

                               
                            </select>
                        </div>
                        <button type="submit" className="add-project__submit">
                            Add Project
                        </button>
                          

                    </form>
                            
                </div>
            </div>
        
            
        </>
    )
}
export default AddProject
