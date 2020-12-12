import React,{useEffect,createContext,useReducer,useContext,useState}from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import {reducer,initialState} from './reducers/userReducer'
import CreatePost from './components/screens/CreatePost'
import CreateEvent from './components/screens/CreateEvent'
import ChatRoom from './components/screens/ChatRoom'
import Chat from './components/screens/Chat'
import Event from './components/screens/Event'
import Complaint from './components/screens/Complaint'
import Resolvedby from './components/screens/ResolvedBy'
import ConfirmEmailPage from './components/screens/confirmEmail'
import Notice from './components/screens/Notice';
import CreateNotice from './components/screens/CreateNotice';
export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const [userType, setUserType] = useState("");
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user")) 
    setUserType(localStorage.getItem("user.utype"))

    if(user){
      dispatch({type:"USER",payload:user})
      
    }else{
      history.push('/signin')
    }
  },[])



  return(
    <Switch>
<Route exact path="/">
<Home/>
  </Route>
  <Route path="/event">
<Event/>
  </Route>
  <Route path="/notice">
<Notice/>
  </Route>
  <Route path="/signup">
<Signup/>
  </Route>
  <Route path="/signin">
<SignIn/>
  </Route>
  <Route path="/profile">
<Profile/>
  </Route>
  <Route path="/createpost">
<CreatePost/>
  </Route>
  <Route path="/createevent">
<CreateEvent/>
  </Route>
  {userType === "student" ? (
            null
          ) : <Route path="/createnotice">
          <CreateNotice />
        </Route>}
  <Route path="/chat">
<Chat/>
</Route>
  <Route path="/chatRoom/:receiver_id">
<ChatRoom/>
  </Route>
  <Route path="/email-verification">
    <ConfirmEmailPage />
    </Route>
  <Route path="/complaint">
<Complaint/>
</Route>
<Route path="/Resolvedby/:id">
  <Resolvedby/>
  </Route>
  </Switch>

  )
}




function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value = {{state,dispatch}}>
    <BrowserRouter>
     <NavBar/>
     <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
