import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import {useSelector} from 'react-redux'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TrackSeats() {
  const [open, setOpen] = React.useState(false);
  const [availableSeats,setAvailableSeats] = React.useState(0)

  let data = useSelector((state)=>{
    return state
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   React.useEffect(()=>{
//     async function getdbData(){
//         const response = await axios.get("http://localhost:5000/gettickets");
//         const dbData = response?.data
//         setAvailableSeats(200-dbData.length)
//     }
//     getdbData()
//   },[open])

  return (
    <div>
      <button className='custom-tickets-btn' onClick={handleClickOpen}>Track Tickets </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Seats Availability"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`${data.totalTickets} Available`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
