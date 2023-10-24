import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './index.css'
export const SeatSelection = () => {
    const [ticketType,setTicketType] = useState('')
    const [ticketQty,setTicketQty] = useState('')
    const dispatch = useDispatch()
  return (
    <div>
        <select value={ticketType} className='custom-select-option' 
        onChange={(e)=>{
            setTicketType(e.target.value)
            dispatch({type:"ticketType",payload:e.target.value})
        }}>
            <option value='' disabled >Ticket type</option>
            <option value='Premium'>Premium</option>
            <option value='Standard'>Standard</option>
        </select>
        <select value={ticketQty} className='custom-select-option'
        onChange={(e)=>{
            setTicketQty(e.target.value)
            dispatch({type:"ticketQty",payload:e.target.value})
        }}
        >
            <option value=''disabled >Qty</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
    </div>
  )
}
