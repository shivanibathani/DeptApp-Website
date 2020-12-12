import React, { useState, useEffect } from "react";
import Modal from "react-awesome-modal"; 
import * as moment from "moment"; // App.js include path <Route path="/Resolvedby/:id"><Resolvedby/>
import "./Complaint.css";
import { useParams } from "react-router-dom";

const Resolvedby = () =>{
 const [resolvecomplaints, setResolvecomplaints] = useState([]);
let {id} = useParams();
useEffect(()=>{
    console.log(id)
		fetch(`/resolvedby/${id}`,{
			method:"Get",
      headers: {
      	"Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
		})
		.then((res)=> res.json())
		.then((data)=>{
			console.log(data.result)
			setResolvecomplaints(data.result.sort((a,b)=>
				b.madeAt>a.madeAt ? 1 : -1
				)
			);
		});
	}, [id]);

const messageDate = (date) => {
    return moment(date).calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    });
  };

return (
 <React.Fragment>
 <div>
  {resolvecomplaints.map(comp => {
  	return(
  		<div key={comp.id}>
  		<h5 className="complaint">Complaint:</h5><h5 className="complaint-ans">{comp.complaint}</h5>
  	<h5 className="madeby"> Made By:</h5><h5 className="madeby-ans">{comp.user_name} </h5>
  	<h5 className="date">
        {messageDate(comp.madeAt)}{" "}{moment(comp.madeAt).format("hh:mm")}
    </h5>
    <h5 className="resolverremark">Resolver Remark:</h5><h5 className="resolverr-ans">{comp.resolver_remarks}</h5>
    <h5 className="date">
        {messageDate(comp.resolvedAt)}{" "}{moment(comp.resolvedAt).format("hh:mm")}
    </h5>
  		</div>
  )})}
 </div>
  </React.Fragment>
)};
export default Resolvedby;