import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import "./Home.css";
import * as moment from "moment";

const Home=() =>{
    
     
    const [data,setData] = useState([])
    const [dataevent,setDataevent] = useState([])
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/allpost',{
        headers:{
           
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res.json())
        .then(result=>{
           // console.log(".result......"+result)
            setData(result.posts)
            fetch('getallcomment',{
          headers:{
           
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res.json())
        .then(ans=>{
           console.log(ans)
            if(ans.error)
            { console.log(ans.error) }
            else {
              console.log(ans.allcomment)
                setComments(ans.allcomment)
            }
            
        })

        })
    },[])
       
   console.log(comment)

    const deletePost = (id)=>{
        
        fetch('/deletepost/'+id,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = data.filter(item=>{
                return item.id !== result.id
            })
            setData(newData)
        })
    }
 
    const makeComment =(id,comment) => {
      console.log(id)
        console.log(comment)
        if (comment !== "") {
          fetch('/comment/'+id, {
            method: "Post",
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              comment,
              
            }),
          })
          .then((res) => res.json())
          window.location.reload()
        }
      };
     

      // const getComment = (id) => {
      //   console.log(id)
      //   fetch('/getcomment/'+id, {
      //        method: "Get",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "Authorization":"Bearer "+localStorage.getItem("jwt")
      //       },
      //   })
      //   .then((res)=>{
      //       setComments(res.comments)
      //   })
      // };

    const likePost = (id)=>{
            let count;
            fetch("/likepost/"+id,{
              method:"post",
              headers:{
                
                "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
            
            }).then(res=>res.json())
            .then(result=>{
              //  console.log(data)
                count=result;
                const newData = data.filter(item=>{
                    if(item.id==result.pid){
                        item.likeCount=result.status;
                    }
                    return item.id !== result.pid
                })                
                setData(newData)
            })
            return count;
    }
    let x = false;
return(
    <div className="hom-body">
        <h1 className="hom-heading">Posts</h1>
        
        {
            data.map(item=>{
                console.log(item);
                console.log(data)
                return(
                    <div className="card home-card color =#8c9eff indigo accent-1" key={item.id}>
                    <h4> 
                    
                    {item.postedbyName}{item.postedbyName === state.full_name
                    &&
                    <button>
                    <i className="material-icons" style={{
                        float:"right"
                    }}
                    onClick={()=>deletePost(item.id)}
                    >delete</i></button>
                    
                }</h4>

                    <div className="card-image">
                    <img src ={item.photo}/>
                    </div>

                    


                    <div className="card-content">
                    
                    <button>
                    <i className="material-icons" style={{
                        float:"right" ,color:"darkblue"
                    }}
                    onClick={()=>{
                        
                   // console.log(x)
                    x = true
                   if(x==true){
                    //x = false
                    likePost(item.id)  
                     
                   } 
                            
                    }}
                    >thumb_up</i></button>                    
                    <h6>{item.likeCount} Likes</h6>
                    <b>{item.title}</b> 
                    <p>{item.body}</p>
                    
                    <div >
                    <input 
            type="text"
            placeholder="Make comment"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            
          />
           </div>
          <button className="btn waves-effect waves-light #1a237e indigo darken-4"onClick={(e) => makeComment(item.id,comment)}>
              Submit
          </button>
    <div>
          <div>
           
    
          </div>
          <div>
            {comments.map(com=>{
                return(
                <div key={com.id}>
                <div>{com.post_id == item.id ? (
                    <div><h6>{com.comment}<h6></h6>
                    {com.user_name}</h6></div>
                
                ) :<div></div>}</div>
                </div>
                )
            })}
          </div>
    </div>

                    </div>
                    <div className="card-image">
                    <img src ={item.poster_url}/>
                    
                    </div>
                </div>
                
                )
            })   
        }
</div>
)}

export default Home