import React from 'react'
import "./portal.css"
import { Link ,useHistory} from 'react-router-dom'
import { useState } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { FaAngleRight } from "react-icons/fa";
import { useEffect } from 'react';
import { useDataLayer } from '../Context/DataLayer';

function AddJob() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("")
    const [location,setLocation] = useState("")
    const [isOpen,setIsOpen] = useState(false)
    const [errors,setErrors] = useState()
    let loginData = JSON.parse(localStorage.getItem('loginData'))
    const base_url = "https://jobs-api.squareboat.info/api/v1/"

    const [{postedJobs},dispatch] = useDataLayer();
    const history = useHistory()


    


    useEffect(() => {
        if(!localStorage.getItem('loginData')){
            history.push('/dashboard')
        }
    },[])


            const handleSubmit = async (e) => {
                e.preventDefault();

               

                    let data = {title,description,location}
        
                    
        
                    let details = await fetch(`${base_url}/jobs/`,{
                        method:'POST',
                        headers:{
                            "Authorization":loginData?.token,
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        },
                        body:JSON.stringify(data)
        
                    })
                    let result = await details.json()
                    if(result?.data){
                        setErrors("")
                        history.push('/portal')
                    }
                    else{
                        setErrors(result?.errors)
                    }
            } 


    const handleLogout = async () => {
        localStorage.removeItem('loginData');
        dispatch({
            type:'SET_LOG',
            value:true
        })
        history.push('/dashboard')
    }


    return (
        <div className="container">
            <div className="container-top">
                <section className="inner">
                        <nav className="navigation">
                            <div className="nav-headings">
                            <Link to='/' className="link"><h1 className="link-name">My<span className='span'>Jobs</span></h1></Link>
                            {/* <button className="btn"><Link to="/login">Login/Signup</Link></button> */}
                            <div className="nav-right">
                                <Link className="link" to="/addJob"><h1 className="link-name">Post a job</h1></Link>
                                <div className="logout" onClick={() => setIsOpen(!isOpen)}>
                                    <h1>{loginData?.name.charAt(0)}</h1>

                                </div>
                                <VscTriangleDown color="white" size="2rem" className="logout-icon" onClick={() => setIsOpen(!isOpen)}/>
                                {isOpen ? 
                                        <div className="modal-logout">
                                        <p onClick={handleLogout}>Logout</p>
                                    </div>:
                                    null}
                            </div>
                            </div>
                        </nav>

                    </section>
                    <div className="home-section">
                        Home <FaAngleRight /> Post a job
                    </div>

                    <div className="form-section">
                        <div className="form-container">
                            <h1>Post a Job</h1>
                            <form action="">
                                <p>Job Title*</p>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter job title"/>
                                {Array.isArray(errors) ? errors.find((x) => x["title"]) !== undefined ? <p className="error-field">{(errors.find((x) => x["title"])).title}</p> : null : null}

                        
                                <p>Description*</p>
                                <input type="textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter job description" />
                                {Array.isArray(errors) ? errors.find((x) => x["description"]) !== undefined ? <p className="error-field">{(errors.find((x) => x["description"])).description}</p> : null : null}

                                <p>Location*</p>
                                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" />
                                {Array.isArray(errors) ? errors.find((x) => x["location"]) !== undefined ? <p className="error-field">{(errors.find((x) => x["location"])).location}</p> : null : null}


                            <div className="button">
                            <button
                            //  onClick={handleSumbit}
                              className="btn btn-form"
                              onClick={handleSubmit}>Post</button>
                           
                            </div>

                                

                            
                            </form>

                        </div>
                    </div>

                    
            </div>

            <div className="container-bottom bottom">

            </div>
        </div>
    )
}

export default AddJob
