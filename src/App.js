import './App.css';
import ProjectOverlay from './components/MainContent/ProjectOverlay';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {OpenSidebarProvider,SelectedProjectProvider, ProjectsContextProvider} from './context'

function App() {

  return (
    <ProjectsContextProvider>
      <SelectedProjectProvider>
        <OpenSidebarProvider>
          <div className="App">
            <Navbar/>
            <div className="main-content">
              <Sidebar/>
              <ProjectOverlay/>
            </div>
            
          </div>

        
        </OpenSidebarProvider>
      </SelectedProjectProvider>
    </ProjectsContextProvider>
   
  );
}

export default App;
