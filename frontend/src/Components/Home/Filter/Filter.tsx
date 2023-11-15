import { Btn, Container } from "./style";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DoneIcon from '@mui/icons-material/Done';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import React from "react";

import { useDispatch,useSelector } from "react-redux";
import {bindActionCreators} from 'redux';
import { actionsCreators,filterState } from "../../../State/index";

export default function Filter() {
    
    const dispatch = useDispatch();
    const filter:boolean[] =useSelector((state:filterState) => state.filter);
    console.log(filter);
    const {changeFilter} = bindActionCreators(actionsCreators,dispatch);

    // const [selected,setSelected] =React.useState<boolean[]> ([false,false,true]);
    // const changeFilter = (index:number) => {
    //     let temp=[false,false,false];
    //     temp[index] = !temp[index];
    //     setSelected(temp)
    // }

    return (
        <Container>
            <Btn flag={filter[0]} onClick={() => changeFilter([true,false,false,false])}>
                <DensitySmallIcon/>
                All
            </Btn>
            <Btn flag={filter[1]} onClick={() => changeFilter([false,true,false,false])}>
                <DoneIcon/>
                Finished
            </Btn>
            <Btn flag={filter[2]} onClick={() => changeFilter([false,false,true,false])}>
                <PublishedWithChangesIcon/>
                Today
            </Btn>
            <Btn flag={filter[3]} onClick={() => changeFilter([false,false,false,true])}>
                <ScheduleIcon/>
                Soon
            </Btn>
        </Container>
    );
}