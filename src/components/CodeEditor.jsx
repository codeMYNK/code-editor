import { useRef, useState, useCallback } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const { colorMode } = useColorMode();

  const onMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.focus();
  }, []);

  const onSelect = useCallback((language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  }, []);

  return (
    <Box>
      <Flex
        direction={["column", "column", "row"]}
        spacing={4}
        alignItems="flex-start"
        wrap="wrap"
      >
        <Box w={["100%", "100%", "50%"]} borderRadius={4}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: { enabled: false },
              wordWrap: "on", // Enable word wrap
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Box w={["100%", "100%", "50%"]} mt={[4, 4, 0]} p={2}>
          <Output editorRef={editorRef} language={language} />
        </Box>
      </Flex>
    </Box>
  );
};

export default CodeEditor;
