import React,{useContext,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar = ()=>{
const {state,dispatch} = useContext(UserContext)
// const [userType, setUserType] = useState("");
const history = useHistory()
const renderList = ()=>{
    
    if(state){
        
            return[
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <li><Link to="/createevent">Create Event</Link></li>,
                <li><Link to="/event">All events</Link></li>,
                <li><Link to="/chat">Chat</Link></li>,
                <li><Link to="/complaint">Complaint</Link></li>,
                <li><Link to="/notice">Notice</Link></li>,
                localStorage.getItem("user.utype") === "student" ? (
                    -1
                  ) : <li><Link to="/createnotice">Create Notice</Link></li>,
                <li>
                    <button className="btn waves-effect waves-light #e65100 orange darken-4
" onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                        }}>Logout</button>
                </li>


            ]

    }else{
            return[
                <li><Link to="/signin">SignIn</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>

        ]

    }

}
    return(
        <nav div className="navbar">
            <div className="nav-wrapper" >
                <Link to={state?"/":"/signin"} className="brand-logo left">Campus Talk</Link>
                <ul id="nav-mobile" className="right">
                        {renderList()}
                </ul>
                
                
            </div>
        </nav>
    )
}

export default NavBar