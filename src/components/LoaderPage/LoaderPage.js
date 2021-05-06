import React from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai'
import {useLoadingDataValue} from '../../context'
import Loader from "react-loader-spinner";
import {useProjectsValue} from '../../context/'
import './LoaderPage.css'

const LoaderPage=() =>{
    const {loadedProjects}= useProjectsValue()
   

    
    return(

        <div>
            {!loadedProjects&& (
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
