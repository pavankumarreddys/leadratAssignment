import React, { useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import { SeatComponent } from '../SeatComponent'
import TrackSeats from './TrackSeats'
import './index.css'

export const Home = () => {
    const [showHeaderContainer,setShowHeaderContainer] = useState(false)
  return (
        <>
            <div>
                {showHeaderContainer ?(
                <div className='custom-myhome-container p-2'>
                    <div>
                        <h4>Movie Name</h4>
                        <p>Pavan Cinemas: Gachibowli | Today,</p>
                    </div>
                    <div className='d-flex'>
                        <TrackSeats/>
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
                {showHeaderContainer && <SeatComponent/>}
            </div>
        </>
  )
}
