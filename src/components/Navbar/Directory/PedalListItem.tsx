import { Flex, MenuItem, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

import React from "react";

const PedalListItem: React.FC = () => {
  return (
    <>
      <Link href="/pedals">
        <MenuItem width="100%" bg="#192734" _hover={{ bg: "#22303c" }}>
          <Flex align="center">
            <Image src="/images/effectpedalicon.png" height="20px" mr={2} />
            <Text>Pedals</Text>
          </Flex>
        </MenuItem>
      </Link>
    </>
  );
};
export default PedalListItem;
