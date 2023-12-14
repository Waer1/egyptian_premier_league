import {List, ListItemText, Typography, styled } from "@mui/material";


export const ListContainer = styled(List)(() => ({
    width: '100%',
     maxWidth: 200,
     bgcolor: 'background.paper'  
     }));
export const ListNumber = styled(ListItemText)(() => ({
    // display:"flex",
    // justifyContent:"space-between" ,
    textAlign:"center",
    width:"20%"
    }));
export const Header = styled(Typography)(() => ({
    boxSizing:"border-box",
    textAlign:"center",
    width:"100%",
    fontSize:20,
    color:"#1976d2",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    }));
export const Container = styled(Typography)(() => ({
    width:"25%",
    maxWidth: 200,
    }));



// export const SelectItemDelete = styled(Button)(() => ({
//     padding: 5,
//     color: '#878a8c',
//     fontSize: 14,
//     fontWeight: 700,
//     width: '100%',
//     justifyContent: 'left',
//     textTransform: 'none',
//     // not working
//     '& .MuiButtonBase-root:hover': {
//       color: '#1a1a1b',
//       backgroundColor: '#e9f5fd',
//     },
//     '&:hover': {
//       color: 'white',
//       backgroundColor: 'red',
//     },
//   }));