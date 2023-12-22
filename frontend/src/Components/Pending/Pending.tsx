import { Box, Typography } from "@mui/material";
import { BOX, Btn, Container, Delete } from "./style";
import moment from "moment";
import React, { useEffect } from "react";
import { User } from "../Types";
import axios from "../../Server/Instance";
import { useSelector } from "react-redux";
import { filterState } from "../../State";
import { error } from "../Alert";


// const PendingList:User[]=[{
//     id:1,
//     firstName:"Ahmed",
//     lastName:"Hosny",
//     email:"eng.ahmedhosny2024@gmail.com",
//     role:"fan",
//     address:"Masr el gadeda",
//     city:"Cairo",
//     dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
//     gender:'male',
//     userName:"AhmedHosny2024"
//   },
//   {
//     id:2,
//     firstName:"Ahmed",
//     lastName:"Hosny",
//     email:"eng.ahmedhosny2024@gmail.com",
//     role:"fan",
//     address:"Masr el gadeda",
//     city:"Cairo",
//     dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
//     gender:'male',
//     userName:"AhmedHosny2024"
//   }
//   ]
export default function Pending( ) {
    const [users,setUsers]=React.useState<User[]>([]);
    const token=useSelector((state:filterState)=>state.token)
    let click=0;
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.get(`/users/pending`)
        .then(res => res.data)
        .then(data => {
            setUsers(data);
        })
        .catch(err => console.log(err));
    },[click]);
    const Del=(id:number)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.delete(`/users/${id}`)
        users.splice(users.findIndex((user)=>user.id===id),1)
        click+=1
        window.location.reload();

    }
    const Approve=(id:number)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.patch(`/users/${id}/approve`)
        .then(res => res)
        .then(res => {
            if(res.status===200||res.status===201)
            {
                users.splice(users.findIndex((user)=>user.id===id),1)
                window.location.reload();
            }
        })
        .catch(err => error(err.response.data.message));
        click+=1


    }
    return (
        // <Box sx={{display:'flex',justifyContent:'flex-start',flexDirection:'column'}}>
<>
    {users.map((user:User,index:number)=>(
        <BOX key={index}>
                <Container>
                    <Box sx={{display:'flex',alignItems:'baseline'}}>
                        <Typography variant="h3"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large" ,m:0}}>
                            {user.userName}
                        </Typography>
                        <Typography variant="h5"  component="div" sx={{color:'black',opacity:0.7,fontSize:"large" ,m:0}}>
                            {user.firstName} {user.lastName}
                        </Typography>
                    </Box>
                    <Typography variant="h5"  component="div" sx={{color:'gray',opacity:0.8,fontSize:"small",m:0}}>
                        {user.email}
                    </Typography>
                </Container>
                <Container>
                    <Box sx={{display:'flex',alignItems:'baseline'}}>
                        <Typography variant="h3"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large",m:0}}>
                            {user.address} &nbsp; 
                        </Typography>
                        <Typography variant="h5"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large",m:0}}>
                            {user.city}
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'baseline'}}>
                        <Typography variant="h3"  component="div" sx={{color:'black',opacity:1,fontSize:"small",m:0}}>
                            {user.gender} &nbsp;
                        </Typography>
                        <Typography variant="h5"  component="div" sx={{color:'black',opacity:1,fontSize:"small",m:0}}>
                            {moment(user.dateOfBirth).format('YYYY-MM-DD')}
                        </Typography>
                    </Box>
                </Container>
                <Container>
                    <Box>
                        <Typography variant="h3"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large" ,m:0}}>
                            {user.role}
                        </Typography>
                    </Box>
                </Container>
                <Box sx={{display:'flex'}}>
                    <Delete onClick={()=>Del(user.id)}>
                        Delete
                    </Delete>
                    <Btn onClick={()=>Approve(user.id)}>
                        Approve
                    </Btn>
                </Box>
        </BOX>
    ))}
    </>
// </Box>
    );
}