import React, {useState, useEffect, useRef, useContext} from 'react'
import {FaBars} from 'react-icons/fa'
import {AiOutlineMenu, AiOutlinePlus, AiOutlineSearch} from 'react-icons/ai'
import {CgHome, CgProfile} from 'react-icons/cg'
import {IoIosTrendingUp} from 'react-icons/io'
import {VscBellDot} from 'react-icons/vsc'
import {BsQuestionCircle} from 'react-icons/bs'
import {useOpenSidebarValue, useAuth} from '../../context'
import './Navbar.css'
import { useHistory } from 'react-router'
// import {useAuth} from '../../context'


function Navbar({user}) {

    const {currentUser, logout} = useAuth()
    const history= useHistory()
    const [searchValue, setSearchValue] = useState('')
    const [searchFocus, setSearchFocus]= useState(false)
    const {openSidebar, setOpenSidebar, handleSidebar} = useOpenSidebarValue()

    const searchInput= useRef()
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

    useEffect(()=>{
        document.addEventListener('click', clearSearchFocus)

        return ()=> document.removeEventListener('click', clearSearchFocus)

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
                        <li className="navbar__section2-icon"><AiOutlinePlus/></li>
                        <li className="navbar__section2-icon"><IoIosTrendingUp/></li>
                        <li className="navbar__section2-icon"><BsQuestionCircle/></li>
                        <li className="navbar__section2-icon"><VscBellDot/></li>
                        <li className="navbar__section2-icon-profile">{user? <img src={user.photoURL}/>: <CgProfile/>}</li>

                    </ul>
                    <button className="main__logout"
                        onClick={handleLogout}>
                        Logout
                    </button>  
                

                



                </div>
                
            </div>
        </div>
    )
}

export default Navbar
