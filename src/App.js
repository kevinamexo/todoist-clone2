import {useContext} from 'react'
import './App.css';
import MainApp from './MainApp'
import ProjectOverlay from './components/MainContent/ProjectOverlay';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import LoaderPage from './components/LoaderPage/LoaderPage'
import Loader from 'react-loader-spinner'
import {OpenSidebarProvider,SelectedProjectProvider, ProjectsContextProvider, TasksContextProvider, LoadingDataContextProvider, AuthProvider} from './context'
import {useShowAddProjectValue, useLoadingDataValue} from './context'
import AddProject from './components/Sidebar/Projects/AddProject/AddProject'
import { ShowAddProjectProvider } from './context/showAddProjectContext';
import LoginForm from './components/Pages/LoginForm'
import SignUpForm from './components/Pages/SignUpForm'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
function App() {



  return (
    <AuthProvider>
      <LoadingDataContextProvider>
        <ProjectsContextProvider>
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
                    <PrivateRoute exact path='/app' component={MainApp}/>
                  </Switch>
                  
                </ShowAddProjectProvider>
              </OpenSidebarProvider>
            </TasksContextProvider>
          </SelectedProjectProvider>
        </ProjectsContextProvider>
      </LoadingDataContextProvider>
    </AuthProvider>
   
   
  );
}

export default App;
