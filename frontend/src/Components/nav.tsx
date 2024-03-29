import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import AddStadium from './Staduim/AddStadium';
import AddMatch from './AddMatch/AddMatch';
import { useSelector } from 'react-redux';
import { filterState } from '../State';
import LogoutIcon from '@mui/icons-material/Logout';

import { useDispatch } from "react-redux";
import {bindActionCreators} from 'redux';
import { actionsCreators } from "../State/index";


// type UserState={
//     state:number
// }
function ResponsiveAppBar() {
    const state= useSelector((state:filterState) => state.state);
    const name= useSelector((state:filterState) => state.name);
    const token : string= useSelector((state:filterState) => state.token);
    const dispatch = useDispatch();
    const {ChangeState,ChangeToken,ChangeId,ChangeName} = bindActionCreators(actionsCreators,dispatch);

    // const fan :string[] = ["Home",'profile', 'Reservation'];
    // const manger :string[] = ["Home",'profile', 'Add match', 'Add stadium'];
    // const admin :string[] = ["Home",'Profile', 'pending', 'users'];
    // const guest :string[] = ['Log in','Sign up'];
    // const [pages, setPages] = React.useState<null | string[]>(null);   

    React.useEffect (()=>{
        if(token===""){
            ChangeState(0)
            ChangeName("")
            ChangeId(null)
            if(window.location.pathname!=='/'){
                window.location.pathname='/'
            }
        }
    },[token])

    console.log(token)
    return (
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                }}
                onClick={()=>window.location.pathname='/'}
            >
                EPL
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
                    onClick={()=>{
                        window.location.pathname='/';}}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Home
            </Button> 

            {
            // Fan
             
            state===1?
            <>
                <Button
                    onClick={()=>window.location.pathname='profile'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Profile
                </Button> 
                <Button
                    onClick={()=>window.location.pathname='reservation'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Reservation
                </Button> 
                
            </>
            :
            // Manager
            state===2?
            <>
                <Button
                    onClick={()=>window.location.pathname='profile'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Profile
                </Button> 
                <AddMatch/>
                <AddStadium/>
            </>:
            state===3 ? 
            // Admin
            <>
                <Button
                    onClick={()=>window.location.pathname='profile'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Profile
                </Button> 
                <Button
                    onClick={()=>window.location.pathname='Users'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Users
                </Button> 
                <Button
                    onClick={()=>window.location.pathname='Pending'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Pending
                </Button> 
            </>:null
                }
            </Box>

            <Box sx={{ flexGrow: 0, display:"flex" }}>
                
            {(state===0) ?
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Login/>
                    <SignUp/>
                </Box>:
                <>
                    <IconButton 
                    onClick={()=>window.location.pathname="profile"} 
                    sx={{ p: 0,borderRadius:1 }}>
                        <Box sx={{color:"white" ,pr:1}}>
                        {name}
                        </Box>
                        <Avatar alt="" src="/broken-image.jpg" />
                    </IconButton>
                    <IconButton sx={{boxSizing:"border-box"}}onClick={async()=>{
                        ChangeToken("");
                        ChangeName("");
                        ChangeState(0);
                        // window.location.pathname="/"
                        }}>
                        <LogoutIcon sx={{color:"white",fontSize:35,mr:-2}}/>
                    </IconButton>
                </>
                }
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;