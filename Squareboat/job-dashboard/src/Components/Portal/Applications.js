import React from 'react'
import "./portal.css"
import { VscChromeClose } from "react-icons/vsc";
import { useDataLayer } from '../Context/DataLayer';
import { HiDocumentText } from "react-icons/hi";


function Applications({handleModal}) {

    const [{candidates},dispatch] = useDataLayer();
    
    
    return (
        <div className="modal-section">

        <div className="modal">
            
            <div className="modal-content">
                <div className="top-heading">
                    <h3>Applications for this job</h3>
                    <VscChromeClose size="1.5rem" onClick={handleModal} className="modal-close"/>

                </div>
                <div className="total-data">
                <p>Total {candidates?.length} applications</p>
                </div>

                <div className="modal-items">

                {candidates?.length > 0 ? 
                
                    candidates.map((x) => (
                        <div className="modal-item">

                            <div className="top-content">
                                <div className="name-logo">
                                    <h1>{x.name.charAt(0)}</h1>
                                </div>
                                <div className="name-details">
                                    <h1 style={{textTransform:"capitalize"}}>{x.name}</h1>
                                    <p>{x.email}</p>
                                </div>
                            </div>
                            <div className="bottom-content">
                                <p style={{fontSize:"1.1rem",fontWeight:"600"}}>Skills</p>
                                <p className="skills">{x.skills}</p>
                            </div>

                            </div>
                    )) : <div className="no-info">
                        <HiDocumentText size="9rem" color="lightgrey"/>
                        <h1 style={{color:"lightgrey"}}>No applications available!</h1>

                    </div>
                }
                </div>
            </div>

        </div>
            
        </div>
    )
}

export default Applications
