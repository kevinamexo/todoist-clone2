import React,{useState, useContext,createContext} from 'react'



export const LoadingDataContext= createContext()

export const LoadingDataContextProvider=({children})=>{
    const [loadingData, setLoadingData]= useState(true)
    
    return(
        <LoadingDataContext.Provider value={{loadingData,setLoadingData}}>
            {children}
        </LoadingDataContext.Provider>
        )

}

export const useLoadingDataValue=()=> useContext(LoadingDataContext)





 