import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import { useDataLayer } from '../Context/DataLayer'
import { VscChromeClose } from "react-icons/vsc";


import "./dashboard.css"
import img from './image'
import { useEffect } from 'react';

function Dashboard() {

    const [{logout},dispatch] = useDataLayer();

    const closeLogout = () => {
        dispatch({
            type:'SET_LOG',
            value:false
        })
    }




    return (
      
        <div className="container">
            <div className="container-top">
                <section className="inner">
                    <nav className="navigation">
                        <div className="nav-headings">
                        <Link to='/' className="link"><h1 className="link-name">My<span className='span'>Jobs</span></h1></Link>
                        <button className="btn"><Link to="/login" className="link">Login/Signup</Link></button>

                        </div>
                    {logout &&                         <div className="successLog" onClick={closeLogout}>
                        <VscChromeClose className="close"/>
                        <div className="message">
                            <h1>Logout</h1>
                            <p>you have successfully logout</p>
                        </div>

                        </div>}
                    </nav>
                    <header className="header">
                        <div className="description">
                            <div className="header-items">
                            <h2 className="welcome">Welcome to <br />
                            My<span className='span'>Jobs</span>
                            </h2>
                            <button className="btn btn-header">get started</button>
                            </div>
                            
                        </div>
                        <div className="header-image">
                            <img src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" alt=" header"/>
                         </div>
                    </header>
                </section>
            </div>
            <div className="container-bottom">
                <section className="inner">
                    <div className="heading-bottom">
                        <h3 className="why">WHY US?</h3>
                    </div>
                    <div className="items">
                        <div className="item-1 item">
                            <p className="title">
                                Get more Visibilty
                            </p>
                            <p className="answer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aut dolores repudiandae dolor, cupiditate quibusdam illo tempora officiis vitae natus?</p>
                        </div>
                        <div className="item-2 item">
                            <p className="title">
                                Organize your Candidates
                            </p>
                            <p className="answer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aut dolores repudiandae dolor, cupiditate quibusdam illo tempora officiis vitae natus?</p>
                        </div>
                        <div className="item-3 item">
                            <p className="title">
                                Verify their abilities
                            </p>
                            <p className="answer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aut dolores repudiandae dolor, cupiditate quibusdam illo tempora officiis vitae natus?</p>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="footer-title">
                            <h1>Companies who trust us</h1>
                        </div>
                        <div className="footer-items">
                            
                            {img.map((x,index) =>(
                                <img src={x.image} alt={x.title} className="image"/>
                            ) )}

                            
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
    )
}

export default Dashboard
