import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'


const Profile=() =>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
const [url,setURL] = useState("")
    useEffect(()=>{
        fetch("/mypost",{
            method:"Get",
            headers:{
               
                "Authorization":"Bearer "+localStorage.getItem("jwt")
              }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.Myposts)
        })
    },[])
    
    useEffect(()=>{
        if(image){
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
                localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                dispatch({type:"UPDATEPIC",payload:data.url})
                fetch('/updatepic',{
                    method:"post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                      },
                      body:JSON.stringify({
                          pic:data.url
                      })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                })
         
            })

         .catch(err=>{
             console.log(err)
         })
        }
     },[image])
     const updatePhoto = (file)=>{
         setImage(file)


     }



return(
    <div style={{maxWidth:"550px", margin:"0px auto"}}>
        <div style={{
   margin:"18px 0px",
    borderBottom:"1px solid grey"
}}>
<div style={{
    display:"flex",
    justifyContent:"space-around",
    
}}>
<div>
<img style={{width:"200px" ,height:"160px",borderRadius:"80px"}}
src = {state?state.pic:"loading.."}/>


</div>
<div>

<h4>{state?state.full_name:"loading"}</h4>
<h6>{state?state.email:"loading"}</h6>

</div>
</div>



  <div className="file-field input-field">
    <div className="btn waves-effect waves-light #1a237e indigo darken-4">
        <span>Update Pic</span>
        <input type="file"
        //value={image}
        onChange={(e)=>updatePhoto(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>

</div>

<div className="gallery">
    {

        mypics.map(item=>{
            return(
                <img key={item.id} className="item" src={item.photo} alt={item.title}/>
            )
        })
    }
  
</div>
</div>
)
}

export default Profile