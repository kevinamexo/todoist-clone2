import React, {createContext, useContext} from 'react'
import {useProjects} from '../firebase-hooks'
 

export const ProjectsContext= createContext()

export const ProjectsContextProvider= ({children})=>{
    const {projects, setProjects, loadedProjects}= useProjects()


    return(
        <ProjectsContext.Provider value={{projects, setProjects, loadedProjects}}>
            {children}
        </ProjectsContext.Provider>
    )
}

export const useProjectsValue=()=> useContext(ProjectsContext)
