import { Typography } from "@mui/material";
import { BOX, Container, Delete } from "./style";


type User={
    firstName:string;
    lastName:string;
    email:string;
    role:string;
}
type UserProps={
    users:User[];
}

export default function Users( props:UserProps) {
    const users=props.users;
    return (
        // <Box sx={{display:'flex',justifyContent:'flex-start',flexDirection:'column'}}>
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