import React from 'react'
import './ProjectOverlay.css'
import {useSelectedProjectValue} from '../../context'


const ProjectOverlay=()=> {

    const {selectedProject} = useSelectedProjectValue()

    return (
        <div className="project-overlay-container">
            <h1 className="p-o-container">{selectedProject}</h1>
        </div>
    )
}

export default ProjectOverlay


