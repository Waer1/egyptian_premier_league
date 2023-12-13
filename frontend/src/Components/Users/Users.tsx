import { Typography } from "@mui/material";
import { BOX, Container, Delete } from "./style";
import { useEffect } from "react";
import React from "react";
import { User } from "../Types";
import axios from "../../Server/Instance";
import { useSelector } from "react-redux";
import { filterState } from "../../State";
import { error, success } from "../Alert";


const users2:User[]=[{
    id:1,
    firstName:"Ahmed",
    lastName:"Hosny",
    email:"aaaaa",
    role:"fan",
    address:"Masr el gadeda",
    city:"Cairo",
    gender:'male',
    userName:"AhmedHosny2024",
    dateOfBirth:new Date("2000-01-01")
    }
]

export default function Users() {
    const [users,setUsers]=React.useState<User[]>(users2);
    const id=useSelector((state:filterState)=>state.id);

    useEffect(() => {
        // TODO: fetch teams from backend
        axios.get(`/users/actual`)
        .then(res => res.data)
        .then(data => {
            console.log(data);
            setUsers(data);
        })
        .catch(err => console.log(err));
    },[]);
    const Del=()=>{
        axios.delete(`/users/${id}`)
        .then(res => success("user deleted successfully"))
        .catch(err => error("can't delete user please try again"));
    }
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
                    <Delete onClick={Del}>
                        Delete
                    </Delete>
                </Container>
        </BOX>
    ))}
    </>
// </Box>
    );
}