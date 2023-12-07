import { Box, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    width:"20%",
    boxSizing:"border-box",
    // boxShadow:"0px 0px 3px 0px #e0e0e0",
    height:"20%",
    padding:10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    }));