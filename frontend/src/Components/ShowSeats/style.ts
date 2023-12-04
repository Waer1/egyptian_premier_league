import { Button, styled } from "@mui/material";

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
export const Btn = styled(Button)(() => ({
display: 'block',
margin:0,
backgroundColor:"white",
color:'#eadb06',
':hover':{
    backgroundColor:"#eadb06",
    color:'white' 
}

}));