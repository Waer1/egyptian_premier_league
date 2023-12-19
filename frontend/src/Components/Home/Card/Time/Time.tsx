import { Box } from "@mui/material";
import { Container } from "./style";
import moment from "moment";

type TimeProps = {
    data: Date;
    time: Date;
}
export default function Time(props:TimeProps) {
const date=moment(props.data).format('YYYY-MM-DD');
const time=moment (props.time);

const hours = time.hours().toString().padStart(2, '0');
const minutes = time.minutes().toString().padStart(2, '0');
const formattedTime = `${hours}:${minutes}`;

// const year = date.getFullYear(); // Get the year (YYYY)
// const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (MM)
// const day = String(date.getDate()).padStart(2, '0'); // Get the day (DD)

// const formattedDate = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"

    return (
        <Container>
            <Box>
                {date}
            </Box>
            <Box>
                {formattedTime}
            </Box>
        </Container>
    );
}