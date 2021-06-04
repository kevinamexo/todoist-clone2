import React, {useEffect, useState} from 'react'
import {firebase} from '../firebase'
import  moment from 'moment';
// import { useProjectsValue } from '../context/projects-context';
import { timeFiltersExist } from '../helpers';
import {useTimeFilterValues} from '../context'
import { timeFilters } from '../constants';


export const useTasks=selectedProject=>{
    const [tasks, setTasks]= useState([])
    const [archivedTasks, setArchivedTasks]= useState([])

    useEffect(()=>{
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
    return {tasks,setTasks, archivedTasks}
}






export const useProjects =()=>{
    const [projects, setProjects]= useState([])
    const [loadedProjects, setLoadedProjects]= useState(false)

  
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
                
                setLoadedProjects(true)
               

        })
            
    
                        
    }, [projects])

    return {projects, setProjects,loadedProjects, setLoadedProjects}
}


export const useGetAllTasks=()=>{
    const [allTasks, setAllTasks] = useState([])
    const [totalTasks, setTotalTasks]= useState(0)
    useEffect(()=>{
        firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', '2irjij20349cuu204')
            .get()
            .then(snapshot=>{
                const allTasksNew= snapshot.docs.map(task=>({
                    ...task.data(),
                    docId: task.id
                }))

                if (JSON.stringify(allTasksNew) !== JSON.stringify(allTasks)) {
                    setAllTasks(allTasksNew);
                  }
                  
            })
        setTotalTasks(allTasks.length)
    }, [allTasks])



    return {allTasks, setAllTasks,totalTasks, setTotalTasks}

}


export const useFilteredTasks=selectedProject=>{
    const [tasks, setTasks]= useState([])
    const [archivedTasks, setArchivedTasks]= useState([])
    const {active}= useTimeFilterValues()
    const [filteredTasks, setFilteredTasks]=useState([])
    console.log(active)

    let timeTasks=null
    

    useEffect(()=>{
        let unsubscribe= firebase 
            .firestore()
            .collection('tasks')
            .where('userId', '==', '2irjij20349cuu204')

        if (active==='today'){
            console.log('its todaayyy')
            unsubscribe=unsubscribe
                .where('date','==',moment().format('DD/MM/YYYY'))
                .get()
                .then(snapshot=>{
                    const timeTasks= snapshot.docs.map(task=>({
                        ...task.data(),
                        docId: task.id
                    }))
                    console.log(timeTasks)
                    if(JSON.stringify(timeTasks) !== JSON.stringify(tasks)) {
                        if (!selectedProject) return
                        if(selectedProject){
                            setFilteredTasks(timeTasks.filter());
                        }
                        
                        console.log('set to ',timeTasks)
                    
                    }   

                })
        }else if (active==='inbox'){
            unsubscribe= unsubscribe
                .where('date','==','').get().then(snapshot=>{
                    const timeTasks= snapshot.docs.map(task=>({
                        ...task.data(),
                        docId: task.id
                    }))
                    console.log(timeTasks)
                    if(JSON.stringify(timeTasks) !== JSON.stringify(tasks)) {
                        setFilteredTasks(timeTasks);
                        console.log('set to ',timeTasks)
                    }   

                })
        }else{
            unsubscribe=unsubscribe
                .where('date','==',moment().diff(moment(), 'days') > 1)
                .get()
                .then(snapshot=>{
                    const timeTasks= snapshot.docs.map(task=>({
                        ...task.data(),
                        docId: task.id
                    }))
                    console.log(timeTasks)
                    if(JSON.stringify(timeTasks) !== JSON.stringify(tasks)) {
                        setFilteredTasks(timeTasks);
                        console.log('set to ',timeTasks)
                        
                    }   

                    
                })
        }

    
        
        
    },[selectedProject, active])



        
    return {tasks,filteredTasks,tasks}

}