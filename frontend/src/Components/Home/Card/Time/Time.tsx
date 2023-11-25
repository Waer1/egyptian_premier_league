import { Box } from "@mui/material";
import { Container } from "./style";

type TimeProps = {
    time: string;
    data: string;
}
export default function Time(props:TimeProps) {
const time=props;
    return (
        <Container>
            <Box>
                {time.time}
            </Box>
            <Box>
                {time.data}
            </Box>
        </Container>
    );
}