import { Flex, Button, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";

const AdminPanel: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pedals/addPedal");
  };
  return (
    <Flex width="243px" borderRadius={2} mb={2} bg="#192734" color="brand.200">
      <Flex margin={3} direction="column" width="100%">
        <Text fontWeight={700} mb={2}>
          Settings
        </Text>

        <Button
          height="25px"
          width="50%"
          mb={1}
          onClick={() => {
            router.push("/pedals/addPedal");
          }}
        >
          Create Pedal
        </Button>
        <Button
          height="25px"
          width="50%"
          mb={1}
          onClick={() => {
            router.push("/admin/manage");
          }}
        >
          Pedal list
        </Button>
      </Flex>
    </Flex>
  );
};
export default AdminPanel;
