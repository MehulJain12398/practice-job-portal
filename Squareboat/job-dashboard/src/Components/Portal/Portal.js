import React from 'react'
import { useDataLayer } from '../Context/DataLayer'
import { Link ,useHistory} from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from "react-icons/vsc";
import "./portal.css"
import { useEffect } from 'react';
import { useState } from 'react';
import Jobs from './Jobs';
import Applications from './Applications';
import { useRef } from 'react';
import paginate from '../utils/usePaginate';



function Portal() {
    const [{postedJobs,candidates,logout},disptach] = useDataLayer()
    const [isOpen,setIsOpen] = useState(false)
    const [showApplications,setShowApplications] = useState(false)
    const [page,setPage] = useState(0)
    const [paginateJobs,setPaginateJobs] = useState([])
    
  
    let loginData = JSON.parse(localStorage.getItem('loginData'))
    const history = useHistory()

   
    const base_url = "https://jobs-api.squareboat.info/api/v1/"



    useEffect(() => {
        if(!localStorage.getItem('loginData')){
            history.push('/dashboard')
        }
    },[])

    useEffect(() => {

        const details = async () => {
            

            
            let result = await fetch(`${base_url}/recruiters/jobs`,{
                method:'GET',
                headers:{
                    "Authorization":loginData?.token
                }
            });

            let response = await result.json()
        

            if(localStorage.getItem('loginData')){

                    if(response?.data){
                let displayData = paginate(response?.data?.data)
                setPaginateJobs(displayData)
                    

  

            disptach({
                type:'SET_JOBS',
                arrayData:displayData[page]
            })
        }        
        else if(result?.message){
            disptach({
                type:'SET_APPLICATIONS',
                arrayData:[]
    
            })
               


            }

            

       
        }
    }

        details();

    },[page])




    const handleLogout = async () => {
        localStorage.removeItem('loginData');
        disptach({
            type:'SET_LOG',
            value:true
        })
        history.push('/dashboard')
    }


    const handleView = async (id) => {

        let applications = await fetch(`${base_url}/recruiters/jobs/${id}/candidates`,{
            method:'GET',
            headers:{
                'Authorization':loginData?.token
            }
        })

        let result = await applications.json()
        if(result?.data){
            disptach({
                type:'SET_APPLICATIONS',
                arrayData:result?.data
    
            })
        }
        else if(result?.message){
            disptach({
                type:'SET_APPLICATIONS',
                arrayData:[]
    
            })
        }

        setShowApplications(!showApplications)

    }

    const handleModal = (e) => {
        setShowApplications(false)

    }

    const handlePage = (index) => {
        setPage(index)

    }

 


    const prev = () => {
        setPage((oldPage => {
            let prevPage = oldPage - 1;
            if(prevPage < 0){
                prevPage = paginateJobs.length - 1
            }
            return prevPage
    }))
    }
    const next = () => {
        setPage((oldPage => {
            let nextPage = oldPage + 1;
            if(nextPage > paginateJobs.length - 1){
                nextPage = 0
            }
            return nextPage
        }))
    }


    return (
        <div className="container">
            <div className="container-portal-top">
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
                                <VscTriangleDown color="white" size="2rem" className="logout-icon" onClick={() => setIsOpen(!isOpen)} />
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
                        Home 
                        
                    </div>

                    <div className="job-section">
                        <div className="job-heading">
                            <h1>Jobs posted by you</h1>
                        </div>



                    </div>
            </div>
            <div className="container-portal-bottom">
                            {<Jobs postedJobs={postedJobs} handleView={handleView} />}
                            {showApplications && <Applications handleModal={handleModal}/>}

                            { paginateJobs.length !== 0 && 
                            <div className="button-bottom">

                            <div className="prev">
                                <button className="prev-button" onClick={prev}>
                                    <VscTriangleLeft />
                                </button>
                            </div>
                                {paginateJobs.map((item,index) => {
                                    return <button key={index} className="page-btn" onClick={() => handlePage(index)}>{index+1}</button>
                                })}

                                <div className="next">
                                    <button className="next-btn" onClick={next}>
                                        <VscTriangleRight />
                                    </button>
                                </div>
                            </div>
                            }
            </div>
        </div>
    )
}

export default Portal
