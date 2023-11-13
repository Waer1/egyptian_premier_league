import { Box, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    boxShadow:"0px 0px 10px 0px #e0e0e0",
    width:"75%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    margin:"15px auto",
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
    justifyContent:"right",
    width:"50%",
    }));
export const TeamName = styled(Box)(() => ({
    fontSize:20,
    }));