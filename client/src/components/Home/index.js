import React, { useState } from 'react'
import {BsFillPencilFill} from 'react-icons/bs'
import {RxCross2} from 'react-icons/rx'
import { SeatComponent } from '../SeatComponent'
import './index.css'

export const Home = () => {
    const [showHeaderContainer,setShowHeaderContainer] = useState(true)
  return (
        <>
            <div>
                {showHeaderContainer ?(
                <div className='bg-secondary text-white p-2 d-flex justify-content-between align-items-center'>
                    <div>
                        <h4>Movie Name</h4>
                        <p>Pavan Cinemas: Gachibowli | Today,</p>
                    </div>
                    <div>
                        <button className='custom-tickets-btn'>Tickets <BsFillPencilFill/></button>
                        <button 
                        className='custom-cross-btn' 
                        onClick={()=>{
                            setShowHeaderContainer(!showHeaderContainer)
                        }}
                        ><RxCross2/>
                        </button>
                    </div>
                </div>
                ):(
                <div className='sample-home-container'>
                    <button
                    className='btn btn-primary'
                    onClick={()=>{
                        setShowHeaderContainer(!showHeaderContainer)
                    }}
                    >Book Tickets
                    </button>
                </div>
                )
                }
            </div>
            <div className='col-12'>
                <SeatComponent/>
            </div>
        </>
  )
}
