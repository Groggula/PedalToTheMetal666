import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SiApplemusic } from "react-icons/si";
import PedalListItem from "./PedalListItem";
import Pedals from "./PedalListItem";

const PageMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ backgroundColor: "#22303c" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={SiApplemusic} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="10pt">
                PEDAL TO THE METAL
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList bg="#192734" border="none">
        <PedalListItem />
        <MenuItem bg="#192734">Pedal Shootout 2023</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default PageMenu;
