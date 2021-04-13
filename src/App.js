import './App.css';
import ProjectOverlay from './components/MainContent/ProjectOverlay';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {OpenSidebarProvider} from './context'
import {SelectedProjectProvider} from './context'
import {useProjects} from './helpers'
function App() {
  return (
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
   
  );
}

export default App;
