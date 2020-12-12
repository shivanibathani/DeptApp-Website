import React, { useState, useEffect } from "react";
import Modal from "react-awesome-modal"; 
import * as moment from "moment";
import "./Complaint.css";
const Complaint = () =>{
	const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState([]);
const [remarks, setRemarks] = useState([]);

	useEffect(()=>{
		fetch("/getAllComplaints",{
			method: "Get",
      headers: {
      	"Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
		})
		.then((res)=> res.json())
		.then((data)=>{
			console.log(data.result)
			setComplaints(data.result.sort((a,b)=>
				b.madeAt>a.madeAt ? 1 : -1
				)
			);
		});
	}, []);

  const messageDate = (date) => {
    return moment(date).calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    });
  };

  const makeComplaint = (value) => {
	setComplaint(value);
	console.log(complaint)
    if (value !== "") {
      fetch("/makecomplaint", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          complaint,
          
        }),
      })
      .then((res) => res.json())
      window.location.reload()
    }
  };

const resolveComplaint = (id,remarks) => {
  console.log(id)
  if(remarks !== "") {
    
    fetch("/reslovecomplaint/"+id, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          remarks,
          
        }),
      })
      .then((res) => res.json())
     
    }
  };


	return(
 <React.Fragment>
  <h1 className="heading-style">Complaints</h1>
  <div className="input-style">
  <input 
            type="text"
            placeholder="Make a complaint"
            value={complaint}
            onChange={(e)=>setComplaint(e.target.value)}
            
          />
		  </div>
          <button className="btn waves-effect waves-light #e65100 orange darken-4" onClick={(e) => makeComplaint(complaint)}>
              Submit
          </button>
  {complaints.map(comp => {
  	return(
    // <input 
    //         type="text"
    //         placeholder="Make a complaint"
    //         value={complaint}
    //         onChange={(e)=>setComplaint(e.target.value)}
            
    //       />
    //       <button onClick={(e) => makeComplaint(complaint)}>
    //           Submit
    //       </button>
  	<div key={comp.id} >
		  <div className="content-style2">
  	<h5 className="complaint">Complaint:</h5><h5 className="complaint-ans">{comp.complaint}</h5>
  	<h5 className="madeby"> Made By:</h5><h5 className="madeby-ans">{comp.user_name} </h5>
  	<h5 className="date">
        {messageDate(comp.madeAt)}{" "}{moment(comp.madeAt).format("hh:mm")}
    </h5>
    </div>
    <div > {comp.resolver_id == '0' ? (
     <div> <input 
            type="text"
            placeholder="Make a remark"
            value={remarks}
            onChange={(e)=>setRemarks(e.target.value)}
          />
    <button className="btn waves-effect waves-light #1a237e indigo darken-4" onClick={(e)=> resolveComplaint(comp.id,remarks)}>Resolve Complaint</button> </div>) : (
    <div className="content-style1"><h5 className="resolvedby">Resolved By:</h5>
    <a href={`/Resolvedby/${comp.resolver_id}`}>{comp.resolver_name}</a>
    <h5 className="resolvern-ans">{comp.resolver_name}</h5>
	<h5 className="resolverremark">Resolver Remarks:</h5><h5 className="resolverr-ans">{comp.resolver_remarks}</h5>
    <h5 className="date">
        {messageDate(comp.resolvedAt)}{" "}{moment(comp.resolvedAt).format("hh:mm")}
    </h5>
    
	</div>
    )}
    </div>
  	</div>
  	)
  })}
  </React.Fragment>
  )
};
export default Complaint;