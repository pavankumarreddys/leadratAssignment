import React, { useState, useEffect } from 'react';

export const SeatingLayout = () => {
  // Define state to store seating data
  const [seats, setSeats] = useState([]);

  // Function to generate seat IDs
  const generateSeatId = (row, seatNumber) => {
    return `${String.fromCharCode(65 + row)}${seatNumber}`;
  };

  // Fetch seating data from the backend when the component mounts
  useEffect(() => {
    // Simulated data for A to Z with 20 seats in each row
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rows = 20;

    const seatingData = [];
    for (let row = 0; row < alphabet.length; row++) {
      const rowSeats = [];
      for (let seatNumber = 1; seatNumber <= rows; seatNumber++) {
        rowSeats.push({
          id: generateSeatId(row, seatNumber),
          status: 'available', // You can set the initial status
        });
      }
      seatingData.push({
        alphabet: alphabet[row],
        seats: rowSeats,
      });
    }

    setSeats(seatingData);
  }, []);

  return (
    <div className='container-fluid bg-success'>
      {seats.map((alphabet, index) => (
        <div key={index} className='row'>
          <div className='col-12'>
            <h4 className=''>Premium</h4>
            <hr />
          </div>
          <div className='col-1'>
            <h2>{alphabet.alphabet}</h2>
          </div>
          <div className='d-flex justify-content-between col-11 seat-row'>
            {alphabet.seats.map((seat, seatIndex) => (
              <div key={seat.id} className={`seat ${seat.status}`}>
                {seat.id}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};



// import React from 'react'

// export const SeatingLayout = () => {
//   return (
//     <div className='container-fluid bg-success'>
//         <div className='row'>
//             <div className='col-12'>
//                 <h4 className=''>Premium</h4><hr/>
//             </div>
//             <div className='col-12'>
//                 <h>A</h>
                

//             </div>
//         </div>
//     </div>
//   )
// }

