import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const BookTicketButton = (props) => {

const {mySeats,renderView} = props
    const handleConformTicket = ()=>{
        const bookedData = []
        
        for (let section of mySeats) {
            for (let seat of section.seats) {
                if(seat.status === "Booked"){
                    bookedData.push(seat.id)
                }
            }
        }
        
        const numberOfTickets = bookedData.length
        const seatStatus = "TicketConformed"
        const seatId = bookedData                                                                   
        
        const ticketsData ={
            numberOfTickets,
            seatStatus,
            seatId
        }
      
          axios.post('http://localhost:5000/booktickets', ticketsData)
            .then((response) => {
              if(typeof(response?.data) === "object"){
                toast.success('Ticket Booking success', {
                  position: toast.POSITION.TOP_CENTER
                });
                setTimeout(()=>{
                  renderView()
                },1500)
              }
            })
            .catch((error) => {
              console.error('Error', error.message);
                  toast.error('Ticket Booking Failed', {
                      position: toast.POSITION.TOP_CENTER
                    });
            });

    }

  return (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <ToastContainer/>
      <button className='btn btn-primary' onClick={handleConformTicket}>Conform Your Ticket</button>
    </div>
  )
}
