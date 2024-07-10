"use client";

import React from "react";

import { AssistantStream } from "openai/lib/AssistantStream";
// @ts-expect-error - no types for this yet
import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";

import { Box, ChakraProvider, Stack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type MessageProps = {
  role: "user" | "assistant";
  text: string;
};

const Home = () => {
  const [resumoVisible, setResumoVisible] = useState(false);
  const [tema, setTema] = useState("");
  const [threadId, setThreadId] = useState("");
  const [lastMessage, setLastMessage] = useState<MessageProps>({ role: "user", text: "" });
  const [resumo, setResumo] = useState("");

  const handleResumoClick = () => {
    sendMessage(tema);
    setResumoVisible(true);
  };

  // create a new threadID when chat component created
  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const sendMessage = async (text) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          content: text,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  // textCreated - create new assistant message
  const handleTextCreated = () => {
    console.log("handleTextCreated");
    //appendMessage("assistant", "");
    setLastMessage({role:"assistant", text:""});
    setResumo("");
  };

  // textDelta - append text to last assistant message
  const handleTextDelta = (delta) => {
    console.log("handleTextDelta: " + resumo + delta.value);
    if (delta.value != null) {
      // appendToLastMessage(delta.value);
      setLastMessage((prevLastMessage) => ({
        ...prevLastMessage,
        text: prevLastMessage.text + delta.value,
      }));
      setResumo((prevResumo) => prevResumo + delta.value);
    }
    if (delta.annotations != null) {
      //annotateLastMessage(delta.annotations);
      console.log("annotations %o", delta.annotations);
    }
  };

  // handleRunCompleted - re-enable the input form
  const handleRunCompleted = () => {
    console.log("streaming finished");
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // messages
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", handleTextDelta);

    // // image
    // stream.on("imageFileDone", handleImageFileDone);

    // // code interpreter
    // stream.on("toolCallCreated", toolCallCreated);
    // stream.on("toolCallDelta", toolCallDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on("event", (event) => {
      // if (event.event === "thread.run.requires_action")
      //   handleRequiresAction(event);
      if (event.event === "thread.run.completed") handleRunCompleted();
    });
  

  };

  return (
    <ChakraProvider>
      <Stack spacing={4} direction="column" align="left" padding={10}>
      
        <Input placeholder="Adicione aqui o tema para o projeto" value={tema} onChange={(e) => setTema(e.target.value)}/>
        <Button colorScheme="blue" onClick={handleResumoClick}>
          Gerar Resumo
        </Button>
      </Stack>
      <Stack
        spacing={5}
        direction="column"
        align="left"
        padding={5}
        display={resumoVisible ? "block" : "none"}
      >
        <Box>Resumo: {resumo}</Box>
        <Textarea placeholder="Adicione aqui o tema para o projeto" value={resumo} onChange={(e) => setResumo(e.target.value)}/>
        <Button colorScheme="blue">Gerar Justificativa</Button>
      </Stack>
    </ChakraProvider>
  );
};

export default Home;
