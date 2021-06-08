import React, {useState} from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai'
import {useLoadingDataValue} from '../../context'
import Loader from "react-loader-spinner";
import {useProjectsValue} from '../../context/'
import {useGetAllTasks} from '../../firebase-hooks'
import './LoaderPage.css'
import { useFilteredTasks } from '../../firebase-hooks';

const LoaderPage=() =>{
    const [loadedTasks,setLoadedTasks]= useState(false)
    const {loadedProjects}= useProjectsValue()
    const Wait= async()=>{
        const r = await useGetAllTasks()
        setLoadedTasks(true)
    }
   
    
    return(

        <div>
            {!loadedProjects&& !loadedTasks&& (
                <div  className="loader-container">
                    <Loader
                        className="loader"
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={5000}
                    
                    />
                </div>
            )}
            
        </div>
    )
            
}
    


export default LoaderPage
