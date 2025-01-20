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
    Icon,
    Highlight,
} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { Toaster, toaster } from "@/components/ui/toaster";
import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegClock } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function App() {
    const levels: ListCollection<string> = createListCollection({
        items: ["A1", "A2", "B1", "B2"],
    }); // for displaying the level options in the dropdown

    const [randomWritingPrompt, setRandomWritingPrompt] = useState(""); // holds the random prompt value from backend
    const [timerSecs, setTimerSecs] = useState(0);
    const [currParagraph, setCurrParagraph] = useState("");
    const [errorArray, setErrorArray] = useState([]);
    const [inputtedParagraph, setInputtedParagraph] = useState("");
    const [responseReceived, setResponseReceived] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    let stoppedTimer = timerSecs;

    const handleChangeInTextArea = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setCurrParagraph(event.target.value);

        let calcWordCount = event.target.value.split("").length; // !!! this would only work for Chinese b/c characters don't have spaces in between
        setWordCount(calcWordCount);
    };

    const handleLvlChange = async (
        details: SelectValueChangeDetails<string>
    ) => {
        try {
            const response = await fetch(`/api/getprompt/${details.value[0]}`);
            const data = await response.text();

            setRandomWritingPrompt(data);
            setTimerSecs(0);
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }

            if (typeof err === "string") {
                throw new Error(err);
            }
        }
    };

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setCurrParagraph(""); // reset the form to an empty string

        // clearInterval(); // reset the timer to 0

        toaster.loading({
            title: "Submitting...",
        });

        const response = await fetch("/api/grammarcheck", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paragraph: currParagraph,
                timer: stoppedTimer,
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            setErrorArray(responseData["errors"]);
            setInputtedParagraph(responseData["originalParagraph"]); // must return the inputted paragraph b/c curr paragraph = '' after submission

            toaster.success({
                title: "Paragraph successfully submitted!",
                description: "Awaiting results...",
            });

            setResponseReceived(true);
        }
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
        <Box px={100} py={50} height="100%" width="75vw" margin="auto">
            {responseReceived && (
                <DialogRoot motionPreset="slide-in-bottom">
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            Show results
                        </Button>
                    </DialogTrigger>
                    <DialogContent color="#fff">
                        <DialogHeader>
                            <DialogTitle>
                                Your paragraph, corrected:
                            </DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <Highlight
                                query={errorArray}
                                styles={{ px: "0.5", bg: "teal.muted" }}
                            >
                                {inputtedParagraph}
                            </Highlight>
                        </DialogBody>
                        <DialogFooter>
                            <DialogTrigger asChild>
                                <Button>Done</Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </DialogContent>
                </DialogRoot>
            )}

            <Toaster />

            <Flex justifyContent="center">
                <Heading mb={10} fontWeight="bold">
                    language paragraph practice tool
                </Heading>
                {/* <CustomButton title="Login" /> */}
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" mb="3rem">
                <Text>Select a level to get a writing prompt</Text>
                <SelectRoot
                    collection={levels}
                    width="12rem"
                    onValueChange={handleLvlChange}
                >
                    <SelectTrigger>
                        <SelectValueText placeholder="Select CEFR level" />
                    </SelectTrigger>
                    <SelectContent
                        borderColor="gray.300"
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

            <Box
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.300"
                borderRadius={6}
                p={5}
                height="65vh"
            >
                <Text fontWeight="bold">
                    {randomWritingPrompt != ""
                        ? randomWritingPrompt
                        : "Writing prompt will appear here"}
                </Text>

                <Text fontSize={"smaller"}>
                    Develop a clear argument with evidence. Use proper sentence
                    structures and vocabulary. Required: 200 words
                </Text>

                <form onSubmit={handleFormSubmit} style={{ height: "50%" }}>
                    <label>
                        Your response:
                        <Textarea
                            name="userParagraph"
                            placeholder="Start writing..."
                            value={currParagraph}
                            onChange={(event) => handleChangeInTextArea(event)}
                            height="100%"
                            borderColor="gray.300"
                        />
                    </label>

                    <Flex justifyContent="space-between">
                        <Flex mb={5} fontSize={"smaller"} gap={3}>
                            <Flex gap={3}>
                                <Text>Words: {wordCount}</Text>
                                <Text>
                                    <Icon fontSize="20px">
                                        <FaRegClock />
                                    </Icon>
                                    {timerSecs} seconds
                                </Text>
                            </Flex>
                        </Flex>

                        <Button bg="#000" color="#fff" type="submit">
                            Submit
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
}
