import React,{useContext} from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import LoaderPage from './components/LoaderPage/LoaderPage'
import Loader from 'react-loader-spinner'
import ProjectOverlay from './components/MainContent/ProjectOverlay'
import {Route, Switch, useHistory} from 'react-router-dom'
import './MainApp.css'
import {AuthContext} from './context/AuthContext'
function MainApp() {
    const {logout}= useContext(AuthContext)
    const history= useHistory()

    const handleLogout =()=>{
        logout()
            .then(()=>{
                history.push('/login')
            })
    }
    return (
        <div className="App">
            <LoaderPage/>
            <Navbar/>
            <div className="main-content">
                <Sidebar/>
                <ProjectOverlay/>    
                

            </div>   

        </div>
    )
}

export default MainApp
