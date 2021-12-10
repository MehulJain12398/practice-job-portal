import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link , useHistory } from 'react-router-dom'
import "./password.css"
function Password() {

    const history = useHistory()

    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    const [password,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [passwordValidation,setPasswordValidation] = useState("")
    const [validation,setValidation] = useState("")
    const [show,setShow] = useState("")
    const [token,setToken] = useState("")
    const base_url = "https://jobs-api.squareboat.info/api/v1/"



    useEffect(() => {
        if(localStorage.getItem('loginData')){
            history.push('/portal')
        }
    })


    const handleSumbit = async (e) => {

        e.preventDefault();

     
            let result = await fetch(`${base_url}/auth/resetpassword?email=${email}`,{
                method:'GET',
                

            })

            let response = await result.json()
            if(response.success){
                let verify = await fetch(`${base_url}/auth/resetpassword/${response?.data?.token}`,{
                    method:'GET'
                });
                let verifyResult = await verify.json()
                if(verifyResult.success){
                    setShow(true)
                    setToken(response?.data?.token)
                    setError("")
                }else{
                    setShow(false)
                    setValidation(true)
                    setError(verifyResult?.message)
                }
            }else{
                setShow(false);
                setValidation(true);
                setError(response.message)
            }
    
            
    }

    const handleSubmitPassword = async (e) => {

        e.preventDefault();

        let data = {password,confirmPassword,token}

        let p_result = await fetch(`${base_url}/auth/resetpassword`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        })

        let p_res = await p_result.json()
        if(p_res.success){
            setPasswordValidation(false)
            history.push("/login")
        }else if(p_res.code === 422){
            
            setPasswordValidation(true)
            setError(p_res?.message)
        }

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
            {show ?                
             <div className="form-section">
                    <div className="form-container">
                        <h1>Reset your password</h1>

                            <p>Enter your password below</p>
                            <br />

                            <form action="">
                                <p>New Password</p>
                                <input type="password" value={password} placeholder="Enter your password"  onChange={e => setNewPassword(e.target.value)} />

                                <p>Confirm Password</p>
                                <input type="password" value={confirmPassword} placeholder="Enter your password"  onChange={e => setConfirmPassword(e.target.value)} />
                                {passwordValidation && <p className="error-field">{error}</p>}
                                <div className="button">
                                <button onClick={handleSubmitPassword} className="btn">Reset</button>
                                </div>
                            </form>

                    </div>
                </div> :                 <div className="form-section">
                    <div className="form-container">
                        <h1>Forgot your Password ?</h1>

                            <p>Enter the Email associated with your account and we'll send you instructions to reset your password</p>
                            <br />

                            <form action="">
                                <p>Email address</p>
                                <input type="email" value={email} placeholder="Enter your email address"  onChange={e => setEmail(e.target.value)} />
                                {validation ? <p className="error-field">{error}</p> : ""}

                                <div className="button">
                                <button onClick={handleSumbit} className="btn btn-form">Submit</button>
                                </div>
                            </form>

                    </div>
                </div>}

            </div>

            <div className="container-bottom bottom">

</div>



            
        </div>
    )
}

export default Password
