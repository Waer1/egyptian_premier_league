import { Box, IconButton, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    marginLeft:10,
    marginBottom:20,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    }));

    
type BtnProps = {
    flag: boolean;
}
export const Btn = styled(IconButton)<BtnProps>(({flag}) => ({
    borderRadius:5,
    ...((flag===true) && {
        color:"#1976d2",
    }),
    
}));
