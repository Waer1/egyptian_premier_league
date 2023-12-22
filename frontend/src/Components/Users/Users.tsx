import { Typography } from "@mui/material";
import { BOX, Container, Delete } from "./style";
import { useEffect } from "react";
import React from "react";
import { User } from "../Types";
import axios from "../../Server/Instance";
import { useSelector } from "react-redux";
import { filterState } from "../../State";
import { error, success } from "../Alert";




export default function Users() {
    const [users,setUsers]=React.useState<User[]>([]);
    const id=useSelector((state:filterState)=>state.id);
    const token=useSelector((state:filterState)=>state.token)

    let click=0;
    useEffect(() => {
        // TODO: fetch teams from backend
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.get(`/users/actual`)
        .then(res => res.data)
        .then(data => {
            console.log(data);
            setUsers(data);
        })
        .catch(err => console.log(err));
    },[click]);
    const Del=(myid:number)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.delete(`/users/${myid}`)
        .then((res) => 
            {
                if(res.status===200||res.status===201)
                {    
                    users.splice(users.findIndex((user)=>user.id===id),1)
                    success("user deleted successfully")
                    click+=1
                    window.location.reload();

                }
            }
        )
        .catch(err => error(err.response.data.message));
    }
    return (
<>
    {users.map((user:User)=>(
        <BOX key={user.id}>
                <Container sx={{width:"40%"}}>
                    <Typography variant="h3"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large" ,m:0}}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="h5"  component="div" sx={{color:'gray',opacity:0.8,fontSize:"small",m:0}}>
                        {user.email}
                    </Typography>
                </Container>
                <Container sx={{width:"40%"}}>
                    <Typography variant="h5"  component="div" sx={{color:'black',opacity:1,fontSize:"x-large",m:0}}>
                        {user.role}
                    </Typography>
                </Container>
                <Container sx={{width:"20%"}}>
                    <Delete onClick={()=>Del(user.id)}>
                        Delete
                    </Delete>
                </Container>
        </BOX>
    ))}
    </>
// </Box>
    );
}