import React, {useState, useContext, createContext} from 'react'


export const ShowAddProjectContext = createContext()


export const ShowAddProjectProvider=({children})=>{
    const [showAddProject, setShowAddProject] = useState(false)
    
    return(

        <ShowAddProjectContext.Provider value={{showAddProject,setShowAddProject}}>
            {children}
        </ShowAddProjectContext.Provider>

    )
}


export const useShowAddProjectValue =()=> useContext(ShowAddProjectContext)