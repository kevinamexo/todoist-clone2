import React, {createContext, useContext, useState} from 'react'
import {useProjects} from '../firebase-hooks'


export const SelectedProjectContext = createContext()

export const SelectedProjectProvider =({children})=>{

    const [selectedProject, setSelectedProject]= useState('inbox')

    return(
        <SelectedProjectContext.Provider
            value={{selectedProject, setSelectedProject}}
        >
            {children}
        </SelectedProjectContext.Provider>
 
    )

}

export const useSelectedProjectValue =()=> useContext(SelectedProjectContext)

