import React from 'react'
import {useTasks} from './firebase-hooks'
import {useSelectedProjectValue, useTimeFilterValue} from './context'
import {useFilteredTasks} from './firebase-hooks'
function Test() {
    const {selectedProject}= useSelectedProjectValue()
    const {tasks,filteredTasks,timeTasks}= useFilteredTasks(selectedProject)
    console.log(filteredTasks)

    return(
        <div>
            
        </div>
    )
}

export default Test
