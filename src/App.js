import {useContext} from 'react'
import './App.css';
import MainApp from './MainApp'
import ProjectOverlay from './components/MainContent/ProjectOverlay';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import LoaderPage from './components/LoaderPage/LoaderPage'
import Loader from 'react-loader-spinner'
import Test from './Test'
import {OpenSidebarProvider,SelectedTimeFilterProvider, ProjectsContextProvider, TasksContextProvider, LoadingDataContextProvider, AuthProvider, TimeFilterProvider, SelectedProjectProvider} from './context'
import {useShowAddProjectValue, useLoadingDataValue} from './context'

import { ShowAddProjectProvider } from './context/showAddProjectContext';
import LoginForm from './components/Pages/LoginForm'
import SignUpForm from './components/Pages/SignUpForm'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import AddProject from './AddProject'


function App() {


  return (
    <AuthProvider>
      <TimeFilterProvider>
        <LoadingDataContextProvider>
          <ProjectsContextProvider>
            <SelectedTimeFilterProvider>
              <SelectedProjectProvider>
                <TasksContextProvider>  
                  <OpenSidebarProvider>
                    <ShowAddProjectProvider>
                      <Switch>
                        <Route exact path='/'>
                          <h1>Landing Page</h1>
                        </Route>
                        <Route exact path='/login'>
                          <LoginForm/>
                        </Route>
                        <Route exact path='/signup'>
                          <SignUpForm/>
                        </Route>
                        <Route exact path='/test'>
                          <Test/>
                        </Route>
                        <PrivateRoute exact path='/app' component={MainApp}/>
                        
                      </Switch>
                      
                    </ShowAddProjectProvider>
                  </OpenSidebarProvider>
                </TasksContextProvider>
              </SelectedProjectProvider>
            </SelectedTimeFilterProvider>
          </ProjectsContextProvider>
        </LoadingDataContextProvider>
      </TimeFilterProvider>
    </AuthProvider>
   
   
  );
}

export default App;
