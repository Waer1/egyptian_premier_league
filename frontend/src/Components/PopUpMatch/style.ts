import { Box, Button, styled } from "@mui/material";

export const Style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  export const Team1 = styled(Box)(() => ({
    display:"flex",
    alignItems:"center",
    justifyContent:"left",
    width:"50%",
    }));
export const Team2 = styled(Box)(() => ({
    display:"flex",
    alignItems:"center",
    justifyContent:"right   ",
    width:"50%",
    }));
export const TeamName = styled(Box)(() => ({
    fontSize:20,
    }));
export const Delete = styled(Button)(() => ({
    display: 'block',
    // margin:0,
    backgroundColor:"white",
    color:'red',
    ':hover':{
        backgroundColor:"red",
        color:'white' 
    },
    margin:"0px 5px",
    }));