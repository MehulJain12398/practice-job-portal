import {Link,useHistory} from 'react-router-dom'
import React, { useState } from 'react'
import {HiUser} from "react-icons/hi"
import {HiUserGroup} from "react-icons/hi"
import "./register.css"
import { useEffect } from 'react'


function Login() {

    const base_url = "https://jobs-api.squareboat.info/api/v1/"
    const [email,setEmail] = useState("")
    const [userRole,setUserRole] = useState(0);
    const [name,setName] = useState("");

    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [skills,setSkills] = useState("");
    const [validation,setValidation] = useState(false)
    const [error,setError] = useState("");
    const history = useHistory()
    // useState({show:false,msg:""})



    useEffect(() => {

        if(localStorage.getItem('loginData')){
            history.push('/portal')
        }

    },[])


    const handleRecruiter = (e) => {
        e.preventDefault()
        setUserRole(0)
    }



    const handleSumbit = async (e) => {
        e.preventDefault();

        let data = {email,password,confirmPassword,userRole,name,skills}
        console.log(data)
        let result = await fetch(`${base_url}/auth/register` ,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)

        });

        let response = await result.json()
        
        if(response.success){
            setValidation(false)
            history.push("/login")
        }
        else if(response.message){
            setValidation(true)
            setError(response?.message)
            
        }else if(response.errors){
            setValidation(true)
            setError(response?.errors)
        }  
    }

    const handleCandidate = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container">
            <div className="container-top">
                <section className="inner">
                        <nav className="navigation">
                            <div className="nav-headings">
                            <Link to='/' className="link"><h1 className="link-name">My<span className='span'>Jobs</span></h1></Link>
                            {/* <button className="btn"><Link to="/login">Login/Signup</Link></button> */}
                            </div>
                        </nav>
                        
                    </section>

                    <div className="form-section">
        <div className="form-container register">
            <h1>Signup</h1>
            <form action="">


                <p>I'm a*</p>
                <div className="user_option">
               
                    <button className="recruiter" onClick={handleRecruiter}>
                    <HiUser size="2rem"/>
                    <p>Recruiter</p>
                    </button>
                

                <button className="candidate" onClick={handleCandidate}>
                    <HiUserGroup size="2rem" />
                    <p>Candidate</p>
                </button>
                    
                    
                </div>

                <p>Full Name</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name"/>
                {Array.isArray(error) ? error.find((x) => x["name"]) !== undefined ? <p className="error-field">{(error.find((x) => x["name"])).name}</p> : null : null}


                <p>Email address</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"/>
                {Array.isArray(error) ? error.find((x) => x["email"]) !== undefined ? <p className="error-field">{(error.find((x) => x["email"])).email}</p> : null : null}

                <div className="password_form">

                    <div className="left">
                    <p>Password</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"/>
                {Array.isArray(error) ? error.find((x) => x["password"]) !== undefined ? <p className="error-field">{(error.find((x) => x["password"])).password}</p> : null : null}
                    </div>

                    <div className="right">
                    <p>Confirm Password</p>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Enter your password"/>
                    {Array.isArray(error) ? error.find((x) => x["confirmPassword"]) !== undefined ? <p className="error-field">{(error.find((x) => x["confirmPassword"])).confirmPassword}</p> : null : null}

                    </div>


                {/* {Array.isArray(error) ? <p>{error[0].password}</p> : <p>{error}</p>} */}
                </div>

                <p>Skills</p>
                <input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="Enter comma seperated skills"/>
                {Array.isArray(error) ? error.find((x) => x["skills"]) !== undefined ? <p className="error-field">{(error.find((x) => x["skills"])).skills}</p> : null : <p className="error-field">{error}</p>}
                <p>{error?.message}</p>

                    <div className="button">
                        <button onClick={handleSumbit} className="btn btn-form">Signup</button>

                        <p>Have a account?<Link to="/login">Login</Link></p>
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

export default Login
