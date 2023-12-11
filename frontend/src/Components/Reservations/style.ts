import { Box, Button, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    // width:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"space-between",
    margin:"10px auto 2px auto",
    padding:15,
}));
export const BOX = styled(Box)(() => ({
    boxShadow:"0px 0px 10px 0px #e0e0e0",
    width:"75%",
    display:"flex",
    alignItems:"center",
    padding:0,
    flexDirection:"row",
    justifyContent:'flex-start',
    margin:"10px auto 2px auto",

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