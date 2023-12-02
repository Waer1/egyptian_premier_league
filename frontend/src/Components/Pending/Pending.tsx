import { Box, Typography } from "@mui/material";
import { BOX, Btn, Container, Delete } from "./style";
import moment from "moment";


type User={
    firstName:string;
    lastName:string;
    email:string;
    role:string;
    address:string;
    city:string;
    dateOfBirth:Date;
    gender:string;
    userName:string;
}
type UserProps={
    users:User[];
}

export default function Pending( props:UserProps) {
    const users=props.users;
    const formattedDate :string[]= users.map((user:User,index:number)=>(
        moment(new Date(user.dateOfBirth)).format('YYYY-MM-DD')
    ))

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