import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Btn, Delete, Style} from './style';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type Coordinates = [number, number]; // [row, column]
type Props = {
    Rows: number;
    Columns: number;
    reserved: Coordinates[];
    };

export default function TakeSeat(props:Props) {
    const [open, setOpen] = React.useState(false);
    const [willReserve, setWillReserve] = React.useState<Coordinates[]>([]);
    const reserved : Coordinates[]=props.reserved;
    const reservedSet = new Set<string>();
    reserved.forEach((point: Coordinates) => {
        reservedSet.add(JSON.stringify(point));
      });
    let numColumns = props.Columns;
    const numRows = props.Rows;
    const imageWidth = 7; // Width of the image in icon units
    const imageHeight = 5; // Height of the image in icon units
    numColumns=numColumns+Math.ceil((imageWidth*imageHeight)/numRows)
    const totalIcons = numColumns*numRows;
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const renderSeats = () => {
        const seats = [];
        const centerX = Math.floor(numColumns / 2);
        const centerY = Math.floor(numRows / 2);
        let iconCount = 0;
        let flag=true;
        for (let i :number= 0; i < numRows; i++) {
        for (let j :number = 0; j < numColumns; j++) {
            const point:Coordinates = [i,j];
            const pointString = JSON.stringify(point);

            if (
            i >= centerY - imageHeight / 2 &&
            i < centerY + imageHeight / 2 &&
            j >= centerX - imageWidth / 2 &&
            j < centerX + imageWidth / 2 

            ) {
                if(!flag){
                    continue;
                }
                flag=false;
            seats.push(
                <img
                key="center-image"
                width={300}
                src={process.env.PUBLIC_URL + '/Stadium.jpg'}
                alt="Stadium"
                style={{
                    position: 'absolute',
                    top :(numRows%2===0 && numColumns%2===0) ?'54%' : (numRows%2===1 && numColumns%2===0) ?'50%' : '54%',
                    left: (numRows%2===0 && numColumns%2===1) ?'50%' : '53%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '1',
                    width: '50  %',
                    boxSizing: 'border-box',
                    padding: '5px',
                }}
                />
            );
            } else if (iconCount < totalIcons) {
                if( reservedSet.has(pointString)){
                    seats.push(
                        <EventSeatIcon
                        key={`icon-${i}-${j}`}
                        sx={{
                            fontSize: '3rem',
                            color: 'red',
                            position: 'absolute',
                            top: `${i * 48}px`,
                            left: `${j * 48}px`,
                            zIndex: '2',
                        }}
                        />
                    );
                }
                else{
                    seats.push(
                        <EventSeatIcon
                        key={`icon-${i}-${j}`}
                        id={`icon-${i}-${j}`}
                        sx={{
                            fontSize: '3rem',
                            color:  (willReserve.findIndex(item => item[0] === point[0] && item[1] === point[1])) ===-1 ? '#1976d2': '#eadb06' ,
                            position: 'absolute',
                            top: `${i * 48}px`,
                            left: `${j * 48}px`,
                            zIndex: '2',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setWillReserve(prevWillReserve => {
                                const index = prevWillReserve.findIndex(item => item[0] === point[0] && item[1] === point[1]);
                                if (index !== -1) {
                                    return prevWillReserve.filter(item => item[0] !== point[0] || item[1] !== point[1]);
                                } else {
                                    return [...prevWillReserve, point];
                                }
                            });
                        }}
                        /> 
                    );
                }
            iconCount++;
            }
        }
        }
        return (
        <div style={{ position: 'relative', width: `${numColumns * 48}px`, height: `${numRows * 48}px` }}>
            {seats}
        </div>
        );
    };
    React.useEffect(() => {
        renderSeats()
    }
    , [willReserve]);
    
  const Confirm = () => {
    console.log(willReserve);
    if(willReserve.length!==0 && cardNumber!=='' && password!==''){
        console.log("Confirm");
        // TODO: send willReserve to backend
        setWillReserve([])
        setOpen(false);
    }
  }
  const Cancel = () => {
    setWillReserve([]);
    console.log(willReserve);
    setOpen(false);
  }
  
  const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
const [cardNumber, setCardNumber] = React.useState('');
const [password, setPassword] = React.useState('');
return (
    <div>
      <Btn onClick={handleOpen} id='Reserve'>Reserve</Btn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...Style, width: `${numColumns * 48}px`,mt:2, pt:3}}>
            {renderSeats()}
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1}}>
            <Box >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="Card Numbe">Card Numbe</InputLabel>
                <Input
                    id="Card Number"
                    type='text' 
                    defaultValue={cardNumber}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        setCardNumber(e.target.value);
                    }}
                />
            </FormControl>
            </Box>

            <Box >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                    }}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
        </Box>
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                <Btn  sx={{m:1}} onClick={Confirm}>Confirm</Btn>
                <Delete sx={{m:1}} onClick={Cancel}>Cancel</Delete>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}