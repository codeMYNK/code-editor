import { useState, useCallback } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = useCallback(async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) {
      toast({
        title: "No code to execute.",
        description: "Please enter some code before running.",
        status: "warning",
        duration: 4000,
      });
      return;
    }
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code.",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [language, editorRef, toast]);

  return (
    <Box>
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : "gray.800"}
        bg="gray.300"
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "gray.300"}
        overflowY="auto"
        // theme="vs-dark"
      >
        {output
          ? output.map((line, i) => (
              <Text key={i} color={isError ? "red.400" : "gray.800"}>
                {line}
              </Text>
            ))
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
