import { Flex, Box, Text, Heading, Textarea, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function App() {
    const [serverMsg, setServerMsg] = useState(""); // holds the msg value from backend (datatype: string)

    useEffect(() => {
        fetch("http://127.0.0.1:5000/msg")
            .then((response) => response.text())
            .then((data) => setServerMsg(data));
    }, []); // empty array = run once

    return (
        <Box px={100} py={50} height="100%">
            <Flex justifyContent="space-between" align="center">
                <Heading>language paragraph practice tool</Heading>
                {/* <CustomButton title="Login" /> */}
            </Flex>

            <Text mt={15} mb={10}>
                Random paragraph writing prompt here
            </Text>

            <Text>0:00 (timer)</Text>

            <form>
                <Textarea
                    name="userParagraph"
                    placeholder="Type your paragraph here..."
                    height="100%"
                />
                <Button type="submit">Submit</Button>
            </form>

            <Box>{serverMsg}</Box>
        </Box>
    );
}
