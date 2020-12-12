import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import "./CreatePost.css";


const CreatePost=() =>{
  const history = useHistory()
  const [title,setTitle]=useState("")
const [body,setBody]=useState("")
const [image,setImage]=useState("")
const [url,setURL]=useState("")


useEffect(()=>{
  if(url){

  fetch("/createpost",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      title,
      body,
      pic:url
    })
  }).then(res=>res.json())
.then(data=>{
  if(data.error){
    M.toast({html: "click button again to upload",classes:"#ffc400 amber accent-3"})
  }
  else{
    M.toast({html: "created post successful",classes:"#43a047 green darken-1"})
    history.push('/')
  }
})
  }
},[url])




const postDetails = ()=>{
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


    return(
      <div className="cp-body">
        <h1 className="cp-heading">Create Post</h1>
<div className="card input-filed color = #1a237e indigo darken-4"
style={{
    margin:"2% 15% -07% 36%",maxWidth:"497px",padding:"20px",textAlign:"center",border:"solid"
}}>
<input type="text" 
placeholder="title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>
<input type="text" 
placeholder="body"
value={body}
onChange={(e)=>setBody(e.target.value)}
/>


<div className="file-field input-field">
  
      <div className="btn waves-effect waves-light #e65100 orange darken-4">
        <span>Upload Image</span>
        <input type="file"
        //value={image}
        onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #e65100 orange darken-4" onClick={()=>postDetails()}>Submit Post
    
    </button>

</div>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<br></br><br></br><br></br><br></br><br></br><br></br>
<br></br>
</div>
    )}
    export default CreatePost