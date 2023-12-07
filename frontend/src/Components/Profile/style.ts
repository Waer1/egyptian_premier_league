import { Box, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    margin: "25px auto",
    padding:10,
    borderLeft:"1px solid #e0e0e0",
    display:'flex',
    flexDirection:'column',
    boxShadow: "2px 2px 2px 1px #1976d2",
    width: "50%",
    justifyContent:'center',
    alignItems:'center',

    }));