import React from 'react'
import { useEffect } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { Link ,useHistory} from 'react-router-dom'




function Jobs({postedJobs,handleView}) {

    

    function trun(str,n){
        if(str){
            if(str.length > n){
                return str.substr(0,n) + "..."
            }
            else{
                return str
            }
        }
    }

    return (
        <div className="job-area">

            {postedJobs.length > 0 ?  <div className="job-data">
        {postedJobs.map((x) => 
        
                (
                    <div className="job-items" key={x.id}>
            <h1 className="title">
                    {x.title}
                </h1>
                <div className="answer">
                <p>{trun(x?.description,100)}</p>
                </div>
                <div className="lower-section">
                    <div className="location">
                        <FaMapMarkerAlt className="location-tag" color="lightblue" size="1.5rem"/>
                        <p className="location-name">{x.location}</p>
                    </div>
                    <div className="button">
                        <button className="btn-applications" onClick={() => handleView(x.id)}>View Applications</button>
                    </div>
                </div>
            </div>

                )

        )}

            
        </div>  : 
        <div className="empty">
                    <div className="empty-sec">
                    <div className="empty-padding">
                    <HiDocumentText size="10rem" />
                    <h1>Your posted jobs will show here!</h1>
                    </div>
                    <Link className="link" to="/addJob"><button className="btn">Post a Job</button></Link>
                    </div>

        </div>

        }
        </div>
        
    )
}

export default Jobs
