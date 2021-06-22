import React, {useState, useContext, createContext} from 'react'


export const ShowQuickAddTaskContext = createContext()


export const ShowQuickAddTaskProvider=({children})=>{
    const [showQuickAddTask, setShowQuickAddTask] = useState(false)
    
    return(

        <ShowQuickAddTaskContext.Provider value={{showQuickAddTask, setShowQuickAddTask}}>
            {children}
        </ShowQuickAddTaskContext.Provider>

    )
}


export const useShowQuickAddTaskValue =()=> useContext(ShowQuickAddTaskContext)