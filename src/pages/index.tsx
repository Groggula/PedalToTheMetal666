import { Flex, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex justifyContent="center" marginTop="10px">
      <Image borderRadius={5} src="/images/largepedalboard.jpg" />
    </Flex>
  );
}
