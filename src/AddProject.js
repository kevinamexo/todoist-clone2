import React,{useState, useEffect,useRef}  from 'react'
import ReactDom from 'react-dom'
import {firebase} from './firebase'
import {Colors, generatePushId} from './helpers'
import {useProjectsValue,useShowAddProjectValue} from './context'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {BsFillCircleFill} from 'react-icons/bs'
import './AddProject.css'
import {Colors as colors, hexCodes, names} from './helpers'
import { useForm } from 'react-hook-form'

function AddProject() {
    const addProjectRef= useRef()
    const [projectName, setProjectName]= useState('')
    const {projects, setProjects}= useProjectsValue()
    const {showAddProject,setShowAddProject}=useShowAddProjectValue()
    const [selectedColor, setSelectedColor]= useState('blue')
    const [showColorList, setShowColorList]= useState(false)
    const {register, handleSubmit, errors}= useForm()
    const projectId= generatePushId()

    
    const addProject=(e)=>{
        e.preventDefault()
        return(
    
            firebase
                .firestore()
                .collection('projects')
                .add({
                    projectId,
                    name: projectName,
                    userId:'2irjij20349cuu204', 
                    color:selectedColor
                })
                .then(()=>{
                    setProjects([...projects])
                    setProjectName('')
                    setShowAddProject(false)
                })
            
            
            
            )
        }


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

    if (!showAddProject) return null
  
    return ReactDom.createPortal(
        
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
                        <div className="form-group__color">
                            <p>Color</p>
                            <div onClick={()=>setShowColorList(!showColorList)} className="form-group__color-select">
                                <span className="form-group__color-circle" role="button" style={{color:selectedColor}}><BsFillCircleFill/></span>
                                <p>{selectedColor}</p>
                            </div>
                        </div>
                        <ul className={showColorList?"form-group__color-color-list":"hidden"} role="listbox" >
                            {Colors.map(color=>(
                                <li className="form-group__color" 
                                    onClick={()=>{
                                        setSelectedColor(color.name)
                                        setShowColorList(false)
                                    }}>
                                    <div className="form-group__color-select">
                                        <span className="form-group__color-circle" role="button" style={{color:color.hex}}><BsFillCircleFill/></span>
                                        <p>{color.name}</p>
                                    </div>
                                </li>
                                
                            ))}
                        </ul>
                        <button type="submit" className="add-project__submit">
                            Add Project
                        </button>
                          

                    </form>
                            
                </div>
            </div>
        
            
        </>,
        document.getElementById('portal')
    )
}
export default AddProject
