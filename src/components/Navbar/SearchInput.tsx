import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.500" mb={1} />}
        />
        <Input
          placeholder="Search Pedal"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            border: "1px solid",
            borderColor: "brand.200",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            bg: "#22303c",
            borderColor: "brand.200",
          }}
          height="34px"
          bg="#22303c"
          border="none"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
