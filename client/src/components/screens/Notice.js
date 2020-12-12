import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'

import "./Event.css";

const Notice=() =>{
    
     const [comment,setComment]=useState("")
    const [data,setData] = useState([])
    // const [dataevent,setDataevent] = useState([])
    const {state,dispatch} = useContext(UserContext)
    
        useEffect(()=>{
            fetch('/allnotice',{
                headers:{
                   
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                  }
                }).then(res=>res.json())
                .then(result=>{
                   // console.log(".result......"+result)
                    setData(result.notices)
        
                })

        
     

    },[])
   
    
    const deleteNotice = (id)=>{
        
        fetch('/deletenotice/'+id,{
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
    
return(
    <div className="ae-body">
        <h1 className="ae-heading">Notices</h1>
        {
            data.map(item=>{
                console.log(item);
                console.log(data)
                return(
                    <div className="card home-card color = #8c9eff indigo accent-1" key={item.id}>
                    

                <h4> 
                    
                    {item.author_name}{item.author_name == state.full_name
                    &&
                    <button>
                    <i className="material-icons" style={{
                        float:"right"
                    }}
                    onClick={()=>deleteNotice(item.id)}
                    >delete</i></button>
                }</h4>


                   
                    <div className="card-image">
                    <img src ={item.notice_url}/>
                    </div>

                    <div className="card-content">
                    
                  
                
                    </div>



                </div>
                )
            })

            
        }
<br></br><br></br><br></br><br></br><br></br><br></br>
<br></br><br></br><br></br><br></br><br></br><br></br>
<br></br><br></br><br></br>
</div>




)
}

export default Notice