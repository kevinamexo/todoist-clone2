import React, {createContext, useState, useContext, useEffect} from 'react';


const RefreshAddTaskContext= createContext()


const RefreshAddTaskProvider=({children})=>{
    const [filterDate, setFilterDate] = useState()
    return(
        <RefreshAddTaskContext.Provider value={{}}>
            {childen}
        </RefreshAddTaskContext.Provider>
    )

}

