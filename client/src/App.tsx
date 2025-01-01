import {
    Flex,
    Box,
    Text,
    Heading,
    Textarea,
    Button,
    createListCollection,
    ListCollection,
} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function App() {
    const levels: ListCollection<string> = createListCollection({
        items: ["A1", "A2", "B1", "B2"],
    });
    const [randomWritingPrompt, setRandomWritingPrompt] = useState(""); // holds the msg value from backend (datatype: string)

    useEffect(() => {
        // only works if you start flask first -> otherwise will give network error
        fetch("http://127.0.0.1:5000/msg")
            .then((response) => response.text())
            .then((data) => setRandomWritingPrompt(data));
    }, []); // empty array = run once

    return (
        <Box px={100} py={50} height="100%">
            <Flex justifyContent="space-between" align="center">
                <Heading mb={10}>language paragraph practice tool</Heading>
                {/* <CustomButton title="Login" /> */}
            </Flex>

            <form>
                <Flex justifyContent="space-between">
                    <Text mt={15} mb={10}>
                        A1: {randomWritingPrompt}
                    </Text>

                    <Flex alignItems="center" gap={5}>
                        <Text>0:00 (timer)</Text>

                        <SelectRoot collection={levels} width="12rem">
                            <SelectTrigger>
                                <SelectValueText placeholder="Select CEFR level" />
                            </SelectTrigger>
                            <SelectContent
                                backgroundColor="white"
                                _hover={{ bg: "white" }}
                            >
                                {levels.items.map((level) => (
                                    <SelectItem item={level}>
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Flex>
                </Flex>

                <Textarea
                    name="userParagraph"
                    placeholder="Type your paragraph here..."
                    height="100%"
                />
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}
