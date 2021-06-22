import React, {useState, useEffect, useRef, useContext} from 'react'
import {FaBars} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'
import {AiOutlineMenu, AiOutlinePlus, AiOutlineSearch} from 'react-icons/ai'
import {CgHome, CgProfile} from 'react-icons/cg'
import {IoIosTrendingUp} from 'react-icons/io'
import {VscBellDot} from 'react-icons/vsc'
import {BsQuestionCircle} from 'react-icons/bs'
import {useOpenSidebarValue, useAuth} from '../../context'
import './Navbar.css'
import { useHistory } from 'react-router'
// import {useAuth} from '../../context'
import UserWidget from './UserWidget/UserWidget'
import {useShowQuickAddTaskValue} from '../../context/showQuickAddTaskContext'

function Navbar({user}) {

    const {currentUser, logout} = useAuth()
    const history= useHistory()
    const [searchValue, setSearchValue] = useState('')
    const [searchFocus, setSearchFocus]= useState(false)
    const {openSidebar, setOpenSidebar, handleSidebar} = useOpenSidebarValue()
    const [showUserWidget,setShowUserWidget]= useState(true)
    const searchInput= useRef()
    const userWidgetRef= useRef()
    const navbarProfile=useRef()
    const {showQuickAddTask,setShowQuickAddTask}= useShowQuickAddTaskValue()

    const clearSearchFocus=(e)=>{

        if (e.target!==searchInput.current){
            setSearchFocus(false)
        }        
    }
    const handleLogout =async ()=>{
        try{
            await logout()
            history.push('/login')
            
        } catch(error){
            console.log(error)
        }
    }
    const handleShowUserWidget =e=>{
        if (userWidgetRef.current.contains(e.target)) return
        if (showUserWidget && navbarProfile.current.contains(e.target)) return


        
        setShowUserWidget(false)
    }

    


    useEffect(()=>{
        document.addEventListener('click', clearSearchFocus)
        document.addEventListener('mousedown', handleShowUserWidget)
        
        return ()=> {
            document.removeEventListener('click', clearSearchFocus)
        
            document.removeEventListener('mousedown', handleShowUserWidget)
        }
    },[])

    

    return (
        <div className="navbar">
            <div className="navbar-inner">
                <ul className="navbar__section1">
                    <li className="navbar__section1-icon"
                        data-testid="navbar-menu-bars"
                        onClick={()=>{
                            
                            setOpenSidebar(!openSidebar)
                            
                            }
                            
                        }
                        
                    >
                        <AiOutlineMenu/>
                    </li>
                    <li className="navbar__section1-icon"><CgHome/></li>
        
                    <div
                        role="button"  
                        className={openSidebar? "hidden":"navbar__section1-search"}
                        onFocus={()=>setSearchFocus(true)}
                    >
                        <span className={searchFocus?"hidden": "search-icon"}>
                            <AiOutlineSearch/>
                        </span>
                        <input value={searchValue} type="text"
                            ref={searchInput}
                            onChange={(e)=>setSearchValue(e.target.value)}
                            className={searchFocus? "navbar__section1-searchInput-white":"navbar__section1-searchInput"}
                            data-testid="navbar-search"
                            placeholder="Find"
                                                    
                            
                        />
                    </div>
                    
                </ul>

            
                <div className="navbar__section2">
                    <ul>
                        <li className="navbar__section2-icon"
                             onClick={()=>setShowQuickAddTask(true)}
                        ><AiOutlinePlus/></li>
                        <li className="navbar__section2-icon"><IoIosTrendingUp/></li>
                        <li className="navbar__section2-icon"><BsQuestionCircle/></li>
                        <li className="navbar__section2-icon"><VscBellDot/></li>
                        <li className="navbar__section2-icon-profile" ref={navbarProfile}
                            onClick={()=>setShowUserWidget(!showUserWidget)}
                        >
                            {currentUser? <img src={currentUser.photoURL} className="profile-photo"/>: <CgProfile/>}
                           
                        </li>
                        <div ref={userWidgetRef} className={ showUserWidget?"navbar__user-overlay":"hidden"}>
                            <section className="user-overlay__header">
                                <div className="user-overlay__section1">
                                    <img src={currentUser.photoURL} className="user-overlay__user-photo"/>
                                    <span className="user-overlay__user-details">
                                        <p className="displayName">{currentUser.displayName}</p>
                                        <p className="email">{currentUser.email}</p>
                                    </span>
                                </div>
                                <div 
                                    role="button"
                                    className="user-overlay__logout-section"
                                    onClick={handleLogout}
                                >
                                    <IoIosLogOut/>
                                    <p>Logout</p>

                                </div>
                            </section>
                        </div>
                        
                    </ul>

                     
                

                



                </div>
                
            </div>
        </div>
    )
}

export default Navbar
