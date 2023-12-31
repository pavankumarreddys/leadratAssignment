import React, { useState, useEffect } from 'react';
import { SeatSelection } from '../SeatSelection';
import { BookTicketButton } from '../BookTicketButton';
import { UseSelector, useSelector,useDispatch } from 'react-redux';


import axios from 'axios';
import './index.css'

export const SeatingLayout = () => {
  const [seats, setSeats] = useState([])
  const [dbData,setDbData] = useState([])
  const [renderUpdated,setRenderUpdated] = useState(false)
  const [numberOfSeats,setNumberOfSeats] = useState(0)
  const dispatch = useDispatch()
  let data = useSelector((state)=>{
      return state
  })

  const generateSeatId = (row, seatNumber) => {
    return `${String.fromCharCode(65 + row)}${seatNumber}`;
  };

  const handleSeatBooking = (id) => {
    const updatedData = [...seats];
    for (let section of updatedData) {
      for (let seat of section.seats) {
        if (seat.id === id) {
          if(seat.status === "available" && numberOfSeats < data.ticketQty){
            seat.status = 'Booked';
            setNumberOfSeats(numberOfSeats+1)
          }else if(seat.status === 'Booked'){
            seat.status = 'available'
            setNumberOfSeats(numberOfSeats-1)
          }
        }
      }
    }

    setSeats(updatedData);
  };

  const unSelectFun = (id)=>{
    console.log("first1",id)
  }

  const ticketTypeTiggred = ()=>{
    console.log("i am  active")
    const updatedData = [...seats];
    for (let section of updatedData) {
      for (let seat of section.seats) {
          if(seat.status !== "ticketConformed" ){
            seat.status = 'available'
          }
      }
    }

    setSeats(updatedData);
    setNumberOfSeats(0)
    dispatch({type:"ticketQty",payload:0})
    
  }

  const renderView = ()=>{
    setRenderUpdated(!renderUpdated)
  }

  useEffect(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRS';
    const rows = 20;
    const seatingData = [];
    for (let row = 0; row < alphabet.length; row++) {
      const rowSeats = [];
      const seatType = alphabet[row] === 'A' ? 'Premium' : 'Standard';
    
      for (let seatNumber = 1; seatNumber <= rows; seatNumber++) {
        rowSeats.push({
          id: generateSeatId(row, seatNumber),
          status: 'available',
          seatType: seatType, // Set the seatType
        });
      }
    
      seatingData.push({
        alphabet: alphabet[row],
        seats: rowSeats,
      });
    }
    
    setSeats(seatingData);

    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/gettickets");
        const dbData = response?.data
        for (let data of dbData){
          for (let section of seatingData) {
            for (let seat of section.seats) {
              if (seat.id === data.seatId) {
                seat.status = 'ticketConformed';
              }
            }
          }
        }

      setDbData(dbData); 
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  },[renderUpdated]);


console.log("numberOfSeats",numberOfSeats)
  return (
    <>
    <div className='container section-seatingLayout-container'>
      <div className='d-flex justify-content-between align-items-center'>
        <SeatSelection ticketTypeTiggred={ticketTypeTiggred}/>
        <div className='d-flex'>
        <div className='custom-seats-visability'>
          <button className='bg-secondary rounded text-white'>seat</button>
          <p>Sold</p>
        </div>
        <div className='custom-seats-visability'>
          <button className='bg-success rounded text-white'>seat</button>
          <p>Selected</p>
        </div>
        <div className='custom-seats-visability'>
          <button className='rounded'>seat</button>
          <p>Available</p>
        </div>
        </div>
      </div>
      {seats.map((alphabet, index) => (
        <div key={index} className='row'>
          <div className='col-12'>
            <h2 className='mt-3'>{alphabet.alphabet === "A" ? "Premium" : alphabet.alphabet === "B" && "Standard"}</h2>
            {(alphabet.alphabet === "A" || alphabet.alphabet === "B") && <hr/>}
          </div>
          <div className='col-1'>
            <h2>{alphabet.alphabet}</h2>
          </div>
          <div className='d-flex justify-content-between col-11 seat-row'>
            {alphabet.seats.map((seat, seatIndex) => (
              <div key={seat.id} 
                className={`seat ${seat.status}`}>
                <button
                className={`rounded seat ${seat.status === 'available' ? 'my-custom-seat-class' :seat.status === 'ticketConformed'?'bg-secondary text-white' :'bg-success text-white'}`}
                onClick={(seat.status !== 'ticketConformed') ? () => handleSeatBooking(seat.id):() => unSelectFun(seat.id)}
                disabled={(seat.status === 'ticketConformed' || data.ticketType === seat.seatType) ? false :true}
                >{seat.id}</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    
    <BookTicketButton mySeats={seats} renderView={renderView}/>
    </>
  );
};
