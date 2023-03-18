import { Flex, MenuItem, Icon, Image } from "@chakra-ui/react";
import Link from "next/link";

import React, { useState } from "react";
// import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";

type PedalsProps = {};

const PedalListItem: React.FC<PedalsProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <CreatePedalModal open={open} handleClose={() => setOpen(false)} /> */}
      <MenuItem
        width="100%"
        fontSize="10pt"
        bg="#192734"
        _hover={{ bg: "#22303c" }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Image src="/images/effectpedalicon.png" height="20px" mr={2} />
          <Link href="/pedals">Pedals</Link>
        </Flex>
      </MenuItem>
    </>
  );
};
export default PedalListItem;
