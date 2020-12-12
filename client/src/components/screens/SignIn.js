import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
import "./SignIn.css";

const SignIn=() =>{
const {state,dispatch} = useContext(UserContext)
  const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
const [full_name,setFull_name]=useState("")
 
const history = useHistory()
const PostData = () =>{
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: "Invalid email address",classes:"#c62828 red darken-3"})
    return
  }
  fetch("/signin",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      full_name,
      email,
      password,
      
    })
  }).then(res=>res.json())
.then(data=>{
  if(data.error){
    M.toast({html: " error signin",classes:"#c62828 red darken-3"})
  }
  else{
    localStorage.setItem("jwt",data.token)
    localStorage.setItem("user",JSON.stringify(data.user))
    localStorage.setItem("id",JSON.stringify(data.user.id))
    localStorage.setItem("utype",JSON.stringify(data.user.utype))
    dispatch({type:"USER",payload:data.user})
    M.toast({html: "signin successful",classes:"#43a047 green darken-1"})
    history.push('/')
  }
})
}
return(
   <div className="log-body">
<div>
  <h1 className="log-head">CAMPUS TALK</h1>
  <div className="form-body">
    <h4 className="form-head">SignIn</h4>

    <div className="log-form">
    <input 
    className="form-ip"
    type="text"
    placeholder="full_name" color = "#01579b light-blue darken-4"
    value={full_name}
    onChange={(e)=>setFull_name(e.target.value)}
    />
    <br/>
      <input
        className="form-ip"
    type="text"
    placeholder="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
      <br />
      <input
       className="form-ip"
    type="password"
    placeholder="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
      <br />
    
      <button
        className="form-btn"
        
        onClick={()=>PostData()}
      >
        SignIn
      </button>
      
    </div>
  </div>
</div>
</div> 
)
}

export default SignIn
