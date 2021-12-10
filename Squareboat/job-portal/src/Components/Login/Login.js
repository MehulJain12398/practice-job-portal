import {Link,useHistory} from 'react-router-dom'
import React, { useState } from 'react'
import "./login.css"
import { useDataLayer } from '../Context/DataLayer'
import { useEffect } from 'react'
import axios from 'axios'


function Login() {

    
    

    const base_url = "https://jobs-api.squareboat.info/api/v1/"
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const [validation,setValidation] = useState(false)
    const [error,setError] = useState("");
    const history = useHistory()
    // useState({show:false,msg:""})


    useEffect(() => {

        if(localStorage.getItem('loginData')){
            history.push('/portal')
        }

    },[])
    const handleSumbit = async (e) => {
        e.preventDefault();

        let data = {email,password}
        let result = await fetch(`${base_url}/auth/login` ,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)

        });
        let response = await result.json()
            if(response.code === 200){
                localStorage.setItem('loginData',JSON.stringify(response.data))
  
                setValidation(false)

                history.push('/portal');
                
            }
            else if(response.code === 401){
               

                setValidation(true)
                setError(response.message)

            }
            else{

               

                setValidation(true)
                setError(response.errors)
               
            }
        // 



        
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
                        <div className="form-container">
                            <h1>Login</h1>
                            <form action="">
                                <p>Email address</p>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"/>
                                {Array.isArray(error) ? error.find((x) => x["email"]) !== undefined ? <p className="error-field">{(error.find((x) => x["email"])).email}</p> : null : null}

                                <div className="password_form">
                                <p>Password</p>
                                <Link to="/password"><p>Forgot your password ?</p></Link>
                                </div>

                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                                {Array.isArray(error) ? error.find((x) => x["password"]) !== undefined ? <p className="error-field">{(error.find((x) => x["password"])).password}</p> : null : <p className="error-field">{error}</p>}


                            <div className="button">
                            <button onClick={handleSumbit} className="btn btn-form">Login</button>
                            <p>New to MyJobs? <Link to="/register">Create an account</Link></p>
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
