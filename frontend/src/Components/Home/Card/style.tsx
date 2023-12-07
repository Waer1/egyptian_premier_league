import { Box, Button, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    boxShadow:"0px 0px 10px 0px #e0e0e0",
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    margin:"10px auto 2px auto",
    padding:15,
    }));
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
export const BOX = styled(Box)(() => ({
    width:"75%",
    display:"flex",
    alignItems:"center",
    padding:0,
    flexDirection:"column",
    margin:"10px auto 2px auto",
    cursor:"pointer",
    }));
export const Delete = styled(Button)(() => ({
    display: 'block',
    // margin:0,
    textTransform:"none",
    backgroundColor:"white",
    color:'red',
    ':hover':{
        backgroundColor:"red",
        color:'white' 
    },
    margin:"0px 5px",
    }));
export const Btn = styled(Button)(() => ({
    display: 'block',
    margin:0,
    backgroundColor:"white",
    color:'#1976d2',
    ':hover':{
        backgroundColor:"#1976d2",
        color:'white' 
    }
    
    }));