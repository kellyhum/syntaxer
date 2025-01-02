import {
    Flex,
    Box,
    Text,
    Heading,
    Textarea,
    Button,
    createListCollection,
    ListCollection,
    SelectValueChangeDetails,
} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function App() {
    const levels: ListCollection<string> = createListCollection({
        items: ["A1", "A2", "B1", "B2"],
    }); // for displaying the level options in the dropdown

    const [randomWritingPrompt, setRandomWritingPrompt] = useState(""); // holds the random prompt value from backend
    const [timerSecs, setTimerSecs] = useState(0);

    const handleLvlChange = (details: SelectValueChangeDetails<string>) => {
        fetch(`http://127.0.0.1:5000/getprompt/${details.value[0]}`)
            .then((response) => response.text())
            .then((data) => {
                setRandomWritingPrompt(data);
                setTimerSecs(0); // reset to 0 every time a new prompt is chosen
            });
    };

    useEffect(() => {
        // when a new prompt is chosen, count up (1s every 1s)
        if (randomWritingPrompt != "") {
            const interval = setInterval(() => {
                setTimerSecs((prev) => prev + 1);
            }, 1000); // 1000ms = 1s

            return () => clearInterval(interval); // on unmount, stop currently running timer
        }
    }, [randomWritingPrompt]); // runs every time randomWritingPrompt changes

    return (
        <Box px={100} py={50} height="100%">
            <Flex justifyContent="space-between" align="center">
                <Heading mb={10}>language paragraph practice tool</Heading>
                {/* <CustomButton title="Login" /> */}
            </Flex>

            <form>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text mt={15} mb={10}>
                        {randomWritingPrompt != ""
                            ? randomWritingPrompt
                            : "Select a level to get a writing prompt"}
                    </Text>

                    <SelectRoot
                        collection={levels}
                        width="12rem"
                        onValueChange={handleLvlChange}
                    >
                        <SelectTrigger>
                            <SelectValueText placeholder="Select CEFR level" />
                        </SelectTrigger>
                        <SelectContent
                            backgroundColor="white"
                            _hover={{ bg: "white" }}
                        >
                            {levels.items.map((level) => (
                                <SelectItem key={level} item={level}>
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                </Flex>

                <Text>{timerSecs} seconds</Text>

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
