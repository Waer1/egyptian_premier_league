import { Box } from "@mui/material";
import { Container } from "./style";

type TimeProps = {
    data: Date;
    time: Date;
}
export default function Time(props:TimeProps) {
const date=props.data;
const time=props.time;

const hours = time.getHours().toString().padStart(2, '0');
const minutes = time.getMinutes().toString().padStart(2, '0');
const formattedTime = `${hours}:${minutes}`;

const year = date.getFullYear(); // Get the year (YYYY)
const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (MM)
const day = String(date.getDate()).padStart(2, '0'); // Get the day (DD)

const formattedDate = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"

    return (
        <Container>
            <Box>
                {formattedDate}
            </Box>
            <Box>
                {formattedTime}
            </Box>
        </Container>
    );
}