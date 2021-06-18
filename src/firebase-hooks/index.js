import React, {useEffect, useState} from 'react'
import {firebase} from '../firebase'
import  moment from 'moment';
// import { useProjectsValue } from '../context/projects-context';
import { timeFiltersExist } from '../helpers';
import {useSelectedProjectValue, useTimeFilterValue} from '../context'
import { timeFilters } from '../constants';



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
    const [filteredTasks,setFilteredTasks]= useState([])
    const [totalTasks, setTotalTasks]= useState(0)
    const {selectedProject}=useSelectedProjectValue()
    const {active}= useTimeFilterValue()
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



    return {allTasks, setAllTasks,totalTasks, setTotalTasks, filteredTasks}

}



export const useFilterTasks= ()=>{
  const {active}= useTimeFilterValue()
  const {selectedProject}= useSelectedProjectValue()
  const {allTasks}= useGetAllTasks()
  const [filteredTasks,setFilteredTasks]= useState([])

  useEffect(()=>{
    if (active!==null){
      if (active==='today'){
          console.log('today')
          let y= allTasks.filter(task=>task.date===moment().format('DD/MM/YYYY'))
          console.log(y)
          setFilteredTasks(y)
      }else if(active==='inbox'){
        console.log('inbox')
        let x= allTasks.filter(task=>task.date==="")
        console.log(x)
        setFilteredTasks(x)
      }else if(active==='upcoming'){
        console.log('upcoming')
        let z= allTasks.filter(task=>moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7)
        console.log(z)
        setFilteredTasks(z)
      }
    }else if(selectedProject!==null){
      console.log('project tasks')
      let d =allTasks.filter(task=>task.projectId===selectedProject.projectId)
      setFilteredTasks(d)
    }
    return ()=>allTasks

  },[active, selectedProject,allTasks])

  return {filteredTasks,setFilteredTasks}
}

export const useTasks =() => {
    const [tasks, setTasks] = useState([]);
    const {active}= useTimeFilterValue()
    const {selectedProject}=useSelectedProjectValue()
    const [archivedTasks, setArchivedTasks] = useState([]);
    
    useEffect(() => {
      let unsubscribe = firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', '2irjij20349cuu204');
  
      unsubscribe =
        active === 'today'
          ? (unsubscribe = unsubscribe.where(
              'date',
              '==',
              moment().format('DD/MM/YYYY')
            ))
          : active === 'inbox'
          ? (unsubscribe = unsubscribe.where('date', '==', ''))
          : selectedProject
          ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject.projectId))
          : unsubscribe
  
      unsubscribe = unsubscribe.onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task => ({
          id: task.id,
          ...task.data(),
        }));
        console.log(newTasks)
  
        setTasks(
          active === 'upcoming'
            ? newTasks.filter(
                task =>
                  moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                  task.archived !== true
              )
            : newTasks.filter(task => task.archived !== true)
        );
        setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });
  
      return () => unsubscribe;
    }, [selectedProject, active]);
  
    return { tasks, archivedTasks };
  };