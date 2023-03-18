import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex justify="center" p="15px 0px">
      <Flex width="95%" justify="center" maxWidth="1260px">
        {/* LEFT SIDE */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "80%" }}
          mr={{ base: 0, md: 6 }}
          bg="#192734"
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
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
