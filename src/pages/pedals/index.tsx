import AdminPanel from "@/src/components/Admin/AdminPanel";
import PageContent from "@/src/components/Layout/PageContent";
import Pedals from "@/src/components/Pedals/Pedals";
import { auth } from "@/src/firebase/config";
import { Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type PedalsPageProps = {
  user: User;
};

const PedalsPage: React.FC<PedalsPageProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <Pedals />
      <>
        {user && <AdminPanel />}
        <Flex mt={2} borderRadius={2} bg="#192734" color="brand.200">
          <Text>Add options for filter pedals / sort by</Text>
        </Flex>
      </>
    </PageContent>
  );
};
export default PedalsPage;
