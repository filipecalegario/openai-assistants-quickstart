"use client";

import React from "react";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { useState } from "react";

const Home = () => {

  const [resumoVisible, setResumoVisible] = useState(false);

  const handleResumoClick = () => {
    setResumoVisible(true);
  }

  return (
    <ChakraProvider>
      <Stack spacing={4} direction="column" align="left" padding={10}>
        <Input placeholder="Adicione aqui o tema para o projeto"/>
        <Button colorScheme="blue" onClick={handleResumoClick}>Gerar Resumo</Button>
      </Stack>
      <Stack spacing={5} direction="column" align="left" padding={5} display={resumoVisible ? "block" : "none"}>
        <Textarea placeholder="Adicione aqui o tema para o projeto"/>
        <Button colorScheme="blue">Gerar Justificativa</Button>
      </Stack>
    </ChakraProvider>
  );
};

export default Home;
