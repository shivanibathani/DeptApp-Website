import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import "./CreatePost.css";


const CreateEvent=() =>{
  const history = useHistory()
  const [name,setName]=useState("")
const [des,setDes]=useState("")
const [image,setImage]=useState("")
const [url,setUrl]=useState("")
const [date,setDate]=useState("")
const [venue,setVenue]=useState("")
const [registration_link,setRegistration_link]=useState("")


useEffect(()=>{
  if(url){

  fetch("/createevent",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      name,
      des,
      pic:url,
      date,
      venue,
      registration_link
    })
  }).then(res=>res.json())
.then(data=>{
  if(data.error){
    M.toast({html: "click button again to upload",classes:"#ffc400 amber accent-3"})
  }
  else{
    M.toast({html: "created event successful",classes:"#43a047 green darken-1"})
    history.push('/event')
  }
})
  }
},[url])




const eventDetails = ()=>{
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
  setUrl(data.url)
})
  .catch(err=>{
    console.log(err+".........error..........")
  })


}


    return(
      <div className="cp-body">
         <h1 className="cp-heading">Create Event</h1>
      <div className="card input-filed color = #1a237e indigo darken-4"
      style={{
          margin:"0% 0% 10% 36%",maxWidth:"500px",padding:"20px",textAlign:"center",border:"solid"
      }}>
<input type="text" 
placeholder="name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<input type="text" 
placeholder="des"
value={des}
onChange={(e)=>setDes(e.target.value)}
/>
<input type="text" 
placeholder="venue"
value={venue}
onChange={(e)=>setVenue(e.target.value)}
/>
<input type="date" 
placeholder="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>
<input type="text" className = "reg-link"

placeholder="registration_link"
value={registration_link}
onChange={(e)=>setRegistration_link(e.target.value)}
/>

<div className="file-field input-field">
      <div className="btn waves-effect waves-light #e65100 orange darken-4">
        <span>Upload Poster</span>
        <input type="file"
        //value={image}
        onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #e65100 orange darken-4" onClick={()=>eventDetails()}>Submit Event
    
    </button>

</div>
<br></br><br></br><br></br><br></br><br></br>
</div>
    )}
    export default CreateEvent