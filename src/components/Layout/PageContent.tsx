import { auth } from "@/src/firebase/config";
import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AdminPanel from "../Admin/AdminPanel";

type PageContentProps = {
  children: ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  return (
    <Flex justify="center" p="15px 0px">
      <Flex width="95%" justify="center" maxWidth="1260px">
        {/* LEFT SIDE */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "80%" }}
          mr={{ base: 0, md: 6 }}
          bg="#192734"
          color="white"
          borderRadius={2}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RIGHT SIDE */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {user && <AdminPanel />}
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
