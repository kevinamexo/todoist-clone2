import React, {useEffect, useState} from 'react'
import {firebase} from '../firebase'
import  moment from 'moment';
// import { useProjectsValue } from '../context/projects-context';
import { timeFiltersExist } from '../helpers';


export const useTasks=selectedProject=>{
    const [tasks, setTasks]= useState([])
    const [archivedTasks, setArchivedTasks]= useState([])

    useEffect=(()=>{
        let unsubscribe= firebase 
            .firestore()
            .collection('tasks')
            .where('userId', '==', '2irjij20349cuu204')
        
        
        unsubscribe =
            selectedProject && !timeFiltersExist(selectedProject)
                ?(unsubscribe= unsubscribe.where('projectId','==',selectedProject))
                : selectedProject==="TODAY"
                ? (unsubscribe= unsubscribe.where(
                    'date', 
                    '==', 
                    moment().format('DD/MM/YYYY')
                   ))
                : selectedProject === 'INBOX'|| selectedProject === 0
                ? (unsubscribe= unsubscribe.where("date","==",''))
                : unsubscribe;

        unsubscribe= unsubscribe.onSnapshot(snapshot => {
            const newTasks= snapshot.docs.map(task=>({
                id: task.id,
                ...task.data(),
            }))


            setTasks(
                selectedProject=== "INBOX"?
                    newTasks.filter(task=>
                        moment(task.date, 'DD-MM-YYY').diff(moment(), 'days') > 1 
                        && task.archived !==true
                    ) 
                : newTasks.filter(task=> task.archived!==true)

            )
            setArchivedTasks(newTasks.filter(task=> task.archived !==false))
      })     
        
       return ()=> unsubscribe();
    }, [selectedProject])
    return {tasks, archivedTasks}
}






// export const useProjects = () => {
//     const [projects, setProjects] = useState([]);
  
//     useEffect(() => {
//         firebase
//             .firestore()
//             .collection('projects')
//             .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
//             .orderBy('projectId')
//             .get()
//             .then(snapshot => {
//                 const allProjects = snapshot.docs.map(project => ({
//                     ...project.data(),
//                     docId: project.id,
//             }));
  
//             if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
//                 setProjects(allProjects);
//             }
//         });
//     }, [projects]);
  
//     return { projects, setProjects };
//   };


export const useProjects =()=>{
    const [projects, setProjects]= useState([])
  
    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', '2irjij20349cuu204')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                  ...project.data(),
                  docId: project.id,
                }))
                
                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                  }

        })
            
    
                        
    }, [projects])

    return {projects, setProjects}
}


