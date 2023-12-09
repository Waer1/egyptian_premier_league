import { Typography } from "@mui/material";
import { BOX, Container, Delete } from "./style";
import { useEffect } from "react";
import React from "react";


type User={
    firstName:string;
    lastName:string;
    email:string;
    role:string;
}
type UserProps={
    users:User[];
}
const users2:User[]=[
    {
      firstName:"Ahmed",
      lastName:"Hosny",
      email:"eng.ahmedhosny2024@gmail.com",
      role:"fan",
    },
    {
      firstName:"Ahmed20",
      lastName:"Hosny20",
      email:"eng.ahmedhosny2020@gmail.com",
      role:"fan",
    },
    {
      firstName:"Ahmed10",
      lastName:"Hosny10",
      email:"eng.ahmedhosny1010@gmail.com",
      role:"fan",
    },
  ]

export default function Users() {
    const [users,setUsers]=React.useState<User[]>(users2);

    useEffect(() => {
        // TODO: fetch teams from backend
    },[]);
    return (
<>
    {users.map((user:User,index:number)=>(
        <BOX key={index}>
                <Container>
                    <Typography variant="h3"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large" ,m:0}}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="h5"  component="div" sx={{color:'gray',opacity:0.8,fontSize:"small",m:0}}>
                        {user.email}
                    </Typography>
                </Container>
                <Container>
                    <Typography variant="h5"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large",m:0}}>
                        {user.role}
                    </Typography>
                </Container>
                <Container>
                    <Delete>
                        Delete
                    </Delete>
                </Container>
        </BOX>
    ))}
    </>
// </Box>
    );
}