import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import "./CreateNotice.css";


const CreateNotice=() =>{
  const history = useHistory()
  
const [image,setImage]=useState("")
const [url,setUrl]=useState("")



useEffect(()=>{
  if(url){

  fetch("/createnotice",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      
      pic:url,
      
    })
  }).then(res=>res.json())
.then(data=>{
  if(data.error){
    M.toast({html: "Student cannot create notice!!!",classes:"#c62828 red darken-3"})
  }
  else{
    M.toast({html: "created notice successful",classes:"#43a047 green darken-1"})
    history.push('/notice')
  }
})
  }
},[url])




const noticeDetails = ()=>{
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
      <div className="cn-body">
        <h1 className="cp-heading">Create Notice</h1>
<div className="card input-filed color =#1a237e indigo darken-4"
style={{
    margin:"90px auto",maxWidth:"500px",padding:"20px",textAlign:"center",border:"solid"
}}>


<div className="file-field input-field">
      <div className="btn waves-effect waves-light #e65100 orange darken-4">
        <span>Upload notice</span>
        <input type="file"
        //value={image}
        onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #e65100 orange darken-4" onClick={()=>noticeDetails()}>Submit Notice
    
    </button>

</div>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
</div>
    )}
    export default CreateNotice