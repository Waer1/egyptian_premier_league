import { Btn, Container } from "./style";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DoneIcon from '@mui/icons-material/Done';
import ScheduleIcon from '@mui/icons-material/Schedule';
import React from "react";
export default function Filter() {
  
    const [selected,setSelected] =React.useState<boolean[]> ([false,false,true]);
    const changeFilter = (index:number) => {
        let temp=[false,false,false];
        temp[index] = !temp[index];
        setSelected(temp)
    }

    return (
        <Container>
            <Btn flag={selected[0]} onClick={() => changeFilter(0)}>
                <DoneIcon/>
                Finished
            </Btn>
            <Btn flag={selected[1]} onClick={() => changeFilter(1)}>
                <PublishedWithChangesIcon/>
                Today
            </Btn>
            <Btn flag={selected[2]} onClick={() => changeFilter(2)}>
                <ScheduleIcon/>
                Soon
            </Btn>
        </Container>
    );
}