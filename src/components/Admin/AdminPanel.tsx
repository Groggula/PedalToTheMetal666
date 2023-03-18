import { Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const AdminPanel: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pedals/addPedal");
  };
  return (
    <Flex borderRadius={2} mt={4} bg="#192734" color="brand.200">
      <Flex margin={3} direction="column" width="100%">
        <Text fontWeight={700}>Admin panel</Text>

        <Button height="25px" width="50%" mb={1} onClick={handleClick}>
          Create Pedal
        </Button>
        <Button height="25px" width="50%" mb={1} onClick={() => {}}>
          Edit Pedal
        </Button>
        <Button height="25px" width="50%" onClick={() => {}}>
          User list
        </Button>
      </Flex>
    </Flex>
  );
};
export default AdminPanel;