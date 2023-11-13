import { IconButton } from "@mui/material";
import { Container } from "./style";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DoneIcon from '@mui/icons-material/Done';
import ScheduleIcon from '@mui/icons-material/Schedule';
export default function Filter() {

    return (
        <Container>
            <IconButton>
                <DoneIcon/>
                Finished
            </IconButton>
            <IconButton>
                <PublishedWithChangesIcon/>
                Today
            </IconButton>
            <IconButton>
                <ScheduleIcon/>
                Soon
            </IconButton>
        </Container>
    );
}