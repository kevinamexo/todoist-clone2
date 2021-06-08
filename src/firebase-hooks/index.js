import React, {useEffect, useState} from 'react'
import {firebase} from '../firebase'
import  moment from 'moment';
// import { useProjectsValue } from '../context/projects-context';
import { timeFiltersExist } from '../helpers';
import {useTimeFilterValue} from '../context'
import { timeFilters } from '../constants';


export const useTasks=(selectedProject,active)=>{
    const [tasks, setTasks]= useState([])
    const [archivedTasks, setArchivedTasks]= useState([])

    useEffect(()=>{
        let filteredTasks=[]
        let unsubscribe= firebase 
            .firestore()
            .collection('tasks')
            .where('userId', '==', '2irjij20349cuu204')
        
        
        
        // if there is no selectedProject, return all for selectedTimeFilter
        // if there is a selectedProject, RETURN ALL WHER PROJECT ID= SELECTED PROJECT
        if (active ==='today'){
            if (selectedProject!==null){
                console.log('filteredToday')
            }else{
                console.log('today all projects')
                console.log(active)
            }
           
        }else if (active==='inbox'){
            console.log(active)
            unsubscribe=unsubscribe.where('userId','==','2irjij20349cuu204').get().then(res=>console.log(res))
            // console.log(filtered)
        }
        
      

    },[tasks,selectedProject,active])

                
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


export const useFilteredTasks=(selectedProject)=>{
    const [tasks, setTasks]= useState([])
    const [archivedTasks, setArchivedTasks]= useState([])
    const {active}= useTimeFilterValue()
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
                    if(selectedProject!==null && JSON.stringify(timeTasks) !== JSON.stringify(tasks)) {
                        console.log('filtering by selected project')
                        setFilteredTasks(timeTasks.filter(t=>t.projectId===selectedProject.projectId));
                        console.log('set to ',timeTasks)
                    }else{
                        setFilteredTasks(timeTasks)
                        console.log('no selectedProject')
                    }                       
                        
    
                    }   

            )
        }else if (active==='inbox'){
            console.log('inbox niggas')
            unsubscribe= unsubscribe
                .where('date','==','').get().then(snapshot=>{
                    const timeTasks= snapshot.docs.map(task=>({
                        ...task.data(),
                        docId: task.id
                    }))
                    console.log(timeTasks)

                    if(selectedProject!==null && JSON.stringify(timeTasks) !== JSON.stringify(tasks)) {
                        console.log('project selected')
                        setFilteredTasks(timeTasks.filter(t=>t.projectId===selectedProject.projectId))
                        console.log('set to ',timeTasks)
                    }else{
                        setFilteredTasks(timeTasks)
                        console.log('non-filtered time tasks')
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

    
        
        
    },[selectedProject, active, tasks])



        
    return {tasks,filteredTasks,tasks,timeTasks}

}