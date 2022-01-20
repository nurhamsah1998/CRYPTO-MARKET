import React from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/react';

function Navbar() {
  return (
    <Flex className="flex items-center justify-between">
      <Text fontSize="6xl" fontWeight="bold">
        Cripto Market
      </Text>
      <Button colorScheme="teal" size="lg">
        Button
      </Button>
    </Flex>
  );
}

export default Navbar;
