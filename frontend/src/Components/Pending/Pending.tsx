import { Box, Typography } from "@mui/material";
import { BOX, Btn, Container, Delete } from "./style";
import moment from "moment";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { User } from "../Types";
import axios from "../../Server/Instance";


type UserProps={
    users:User[];
}
const PendingList:User[]=[{
    id:1,
    firstName:"Ahmed",
    lastName:"Hosny",
    email:"eng.ahmedhosny2024@gmail.com",
    role:"fan",
    address:"Masr el gadeda",
    city:"Cairo",
    dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
    gender:'male',
    userName:"AhmedHosny2024"
  },
  {
    id:2,
    firstName:"Ahmed",
    lastName:"Hosny",
    email:"eng.ahmedhosny2024@gmail.com",
    role:"fan",
    address:"Masr el gadeda",
    city:"Cairo",
    dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
    gender:'male',
    userName:"AhmedHosny2024"
  }
  ]
export default function Pending( ) {
    const [users,setUsers]=React.useState<User[]>(PendingList);
    const formattedDate :string[]= users.map((user:User,index:number)=>(
        moment(new Date(user.dateOfBirth)).format('YYYY-MM-DD')
    ))
    useEffect(() => {
        // wait for waer
        // TODO: fetch teams from backend
        // axios.get(`/users/pending`)
        // .then(res => res.data)
        // .then(data => {
        //     console.log(data);
        //     setUsers(data);
        // })
        // .catch(err => console.log(err));

    },[]);
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
                            {formattedDate[index]}
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
                    <Delete>
                        Delete
                    </Delete>
                    <Btn>
                        Approve
                    </Btn>
                </Box>
        </BOX>
    ))}
    </>
// </Box>
    );
}