import React, {useState, useEffect, createContext, useContext} from 'react'
import {useGetAllTasks} from '../firebase-hooks'
 

export const TasksContext= createContext()

export const TasksContextProvider= ({children})=>{
    const {allTasks, setAllTasks, totalTasks, setTotalTasks}= useGetAllTasks()



    return(
        <TasksContext.Provider value={{allTasks, setAllTasks, totalTasks, setTotalTasks}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasksValue=()=> useContext(TasksContext)


 

