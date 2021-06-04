import React from 'react'
import {useFilteredTasks} from './firebase-hooks'
function Test() {
    const r= useFilteredTasks()
    console.log(r)
    return (
        <div>
            
        </div>
    )
}

export default Test
