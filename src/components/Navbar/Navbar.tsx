import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

import { auth } from "@/src/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import PageMenu from "./Directory/PageMenu";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      bg="#192734"
      color="#ffffff"
      margin="5px"
      height="50px"
      padding="5px"
      borderRadius={2}
      justify="space-between"
    >
      <PageMenu />
      <Flex display={{ base: "none", md: "flex" }} align="center" p={5}></Flex>
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
