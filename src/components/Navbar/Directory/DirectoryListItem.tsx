import { Flex, MenuItem, Image, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type DirectoryListItemProps = {
  link: string;
  icon: IconType;
  text: string;
};

const DirectoryListItem: React.FC<DirectoryListItemProps> = ({
  text,
  link,
  icon,
}) => {
  return (
    <>
      <Link href={link}>
        <MenuItem width="100%" bg="#192734" _hover={{ bg: "#22303c" }}>
          <Flex align="center">
            <Icon as={icon} fontSize={20} mr={2} />
            <Text>{text}</Text>
          </Flex>
        </MenuItem>
      </Link>
    </>
  );
};
export default DirectoryListItem;
