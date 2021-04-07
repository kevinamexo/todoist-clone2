import './App.css';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {OpenSidebarProvider} from './context'

function App() {
  return (
    <OpenSidebarProvider>
      <div className="App">
        <Navbar/>
        <Sidebar/>
      </div>

    </OpenSidebarProvider>
   
  );
}

export default App;
