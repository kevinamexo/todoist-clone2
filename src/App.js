import {useContext} from 'react'
import './App.css';
import ProjectOverlay from './components/MainContent/ProjectOverlay';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import LoaderPage from './components/LoaderPage/LoaderPage'
import Loader from 'react-loader-spinner'
import {OpenSidebarProvider,SelectedProjectProvider, ProjectsContextProvider, TasksContextProvider, LoadingDataContextProvider} from './context'
import {useShowAddProjectValue, useLoadingDataValue} from './context'
import AddProject from './components/Sidebar/Projects/AddProject/AddProject'
import { ShowAddProjectProvider } from './context/showAddProjectContext';
function App() {



  return (
    <LoadingDataContextProvider>
      <ProjectsContextProvider>
        <SelectedProjectProvider>
          <TasksContextProvider>  
            <OpenSidebarProvider>
              <ShowAddProjectProvider>
                <div className="App">
                <LoaderPage/>
                <Navbar/>
                <div className="main-content">
                  <Sidebar/>
                  <ProjectOverlay/>      
                          
                </div>
                  
                  
                  
                </div>)
              </ShowAddProjectProvider>
            </OpenSidebarProvider>
          </TasksContextProvider>
        </SelectedProjectProvider>
      </ProjectsContextProvider>
    </LoadingDataContextProvider>
   
   
  );
}

export default App;
