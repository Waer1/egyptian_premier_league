import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FormControl,Input,  InputLabel,Typography } from '@mui/material';
import {Style} from './style';
import axios from "../../Server/Instance";
import { error, success } from '../Alert';

export default function AddStadium() {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
const [Rows, setRows] = React.useState(10);
const [Columns, setColumns] = React.useState(10);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Add=()=>{
    // TODO: send data to backend
    axios.post('/stadium',{
      name:userName,
      rows:Rows,
      seatsPerRow:Columns
    }).then((res)=>{
      success("Stadium added successfully");
      handleClose();

    }).catch((err)=>{
      error("Something went wrong");
    })
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ my: 2, color: 'white', display: 'block' }} id='Signup'>Add Stadium</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...Style, width: 400 ,display: 'flex', alignItems: 'center' ,justifyContent:"center",flexDirection:"column"}}>
            <Box sx={{display:"flex" , alignItems:"center",my:1}}>
                <SportsSoccerIcon sx={{fontSize:'3rem',color:'#1976d2'}}/>
                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#1976d2',
                textDecoration: 'none',
                }}
                >
                    EPL
                </Typography>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 400,my:1}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="User Name">Name</InputLabel>
                    <Input
                        id="User Name"
                        type='text' 
                        defaultValue={userName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setUserName(e.target.value);
                        }}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="rows">Rows</InputLabel>
                    <Input
                        id="Rows"
                        type='number' 
                        defaultValue={Rows}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setRows(Number(e.target.value));
                        }}
                        inputProps={{ min: 10}}

                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Columns">Columns</InputLabel>
                    <Input
                        id="Columns"
                        type='number' 
                        inputProps={{ min: 10}}
                        defaultValue={Columns}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setColumns(Number(e.target.value));
                        }}
                    />
                </FormControl>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                <Button variant="contained" sx={{m:1}} onClick={Add}>Submit</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}