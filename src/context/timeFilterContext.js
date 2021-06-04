import React, {useState, useContext, createContext} from 'react'



export const TimeFilterContext= createContext()

export const TimeFilterProvider= ({children})=>{
    const [active,setActive]= useState('inbox')

    return(
        <TimeFilterContext.Provider value={{active,setActive}}>
            {children}
        </TimeFilterContext.Provider>
    )
}

export const useTimeFilterValues=()=> useContext(TimeFilterContext)