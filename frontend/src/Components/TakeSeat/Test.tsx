import React from 'react';
import Modal from '@mui/material/Modal';
import EventSeatIcon from '@mui/icons-material/EventSeat';


type Coordinates = [number, number]; // [row, column]
type Props = {
    Rows: number;
    Columns: number;
    reserved: Coordinates[];
    };
const CircularIconsModal = (props:Props) => {
    const [open, setOpen] = React.useState(false);
    const reserved : Coordinates[]=props.reserved;
    const reservedSet = new Set<string>();
    reserved.forEach((point: Coordinates) => {
        reservedSet.add(JSON.stringify(point));
      });
    let numColumns = props.Columns;
    const numRows = props.Rows;
    const imageWidth = 6; // Width of the image in icon units
    const imageHeight = 4; // Height of the image in icon units
    numColumns=numColumns+Math.ceil((imageWidth*imageHeight)/numRows)
    const totalIcons = 100;
    
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
            seats.push(
                <img
                key="center-image"
                width={300}
                src={process.env.PUBLIC_URL + '/Stadium.jpg'}
                alt="Stadium"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '46%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '1',
                    width: '52%',
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
                        sx={{
                            fontSize: '3rem',
                            color: '#1976d2',
                            position: 'absolute',
                            top: `${i * 48}px`,
                            left: `${j * 48}px`,
                            zIndex: '2',
                            cursor: 'pointer',
                        }}
                        onClick={() => console.log(`Clicked ${i}-${j}`)}
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
    
    return (
        <div>
        <button type="button" onClick={handleOpen}>
            Open Modal
        </button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {renderSeats()}
            </div>
        </Modal>
        </div>
    );
    };
export default CircularIconsModal;
      