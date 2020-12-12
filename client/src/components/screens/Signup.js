import React,{useState,useEffect,Component} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Select from 'react-select'
import Dropdown from 'react-dropdown';
import { RadioGroup, RadioButton } from 'react-radio-buttons';



 import "./SignUp.css";
const Signup=() =>{
const [full_name,setFullName]=useState("")

const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
const [image,setImage] = useState("")
 const [utype,setType] = useState("")
const [url,setURL] = useState(undefined)
const history = useHistory()


useEffect(()=>{

  if(url){
    uploadFields()
  }
  
},[url])
const uploadPic = ()=>{

  const data = new FormData()
  data.append("file",image)
  data.append("upload_preset","deptapp")
  data.append("cloud_name","shivani19")
  fetch("https://api.cloudinary.com/v1_1/shivani19/image/upload",{
    method:"post",
    body:data
  })
.then(res=>res.json())
.then(data=>{
  setURL(data.url)
})
  .catch(err=>{
    console.log(err+".........error..........")
  })

}



const uploadFields = ()=>{

  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: "Invalid email address",classes:"#c62828 red darken-3"})
    return
  }
  fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      full_name,
      
      email,
      password,
      pic:url,
       utype,
    })
  }).then(res=>res.json())
.then(data=>{
  if(data.error){
    M.toast({html: data.error,classes:"#c62828 red darken-3"})
  }
  else{
    M.toast({html: "Do email verification",classes:"#43a047 green darken-1"})
    history.push('/email-verification')
  }
})

}

const PostData = () =>{




if(image){
  uploadPic()
}
else{
uploadFields()

}
}


return(
  <React.Fragment>
     <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
        rel="stylesheet"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="reg-body">
        <div>
          <h1 className="reg-head">CAMPUS TALK</h1>
          <div className="reg-form-body">
            <h4 className="form-head">SignUp</h4>

            <div className="reg-form">
              <input
                className="form-ip"
                type="text"
  placeholder="Full Name"
  value={full_name}
  onChange={(e)=>setFullName(e.target.value)}
              />
              <br />
             
              <input
                className="form-ip"
                type="text"
  placeholder="Email"
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
              <div className="radio-body" onChange={(e)=>setType(e.target.value)}>
              <label className="lbl1">You are :</label>
    <label className="lbl">
        <input className="with-gap" name="group1" type="radio" value="student"/>
        <span>Student</span>
      </label>
      <label className="lbl">
        <input className="with-gap" name="group1" type="radio" value="faculty"/>
        <span>Faculty</span>
      </label>
      </div>
      
              <div className="btn #b9f6ca">
      <span>Upload Pic </span>
      <input type="file"
      // value={image}
      onChange={(e)=>setImage(e.target.files[0])}/>
    </div>
    <div className="file-path-wrapper">
      <input className="file-path validate" type="text"/>
    </div>

              <button
                className="form-btn"
                onClick={()=>PostData()}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
  </React.Fragment>
)
}

export default Signup
