import React, {createContext, useState, useContext} from 'react'

export const OpenSidebarContext= createContext()

export const OpenSidebarProvider= ({children})=>{
    const [openSidebar, setOpenSidebar]= useState(true)
    const handleSidebar=()=> setOpenSidebar(!openSidebar)

    return (
        <OpenSidebarContext.Provider value={{openSidebar, setOpenSidebar}}>
            {children}
        </OpenSidebarContext.Provider>
    )
}


export const useOpenSidebarValue=()=> useContext(OpenSidebarContext)