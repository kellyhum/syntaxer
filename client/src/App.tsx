import { Flex, Box, Text, Heading, Textarea } from "@chakra-ui/react";

export default function App() {
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

            <Textarea placeholder="Type your paragraph here..." />
        </Box>
    );
}
