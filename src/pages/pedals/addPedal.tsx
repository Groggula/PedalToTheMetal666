import AdminPanel from "@/src/components/Admin/AdminPanel";
import PageContent from "@/src/components/Layout/PageContent";
import CreatePedal from "@/src/components/Admin/CreatePedal";
import { auth } from "@/src/firebase/config";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";

const addPedalPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <PageContent>
      <>
        {user ? (
          <Flex justify="center">
            <CreatePedal user={user} />
          </Flex>
        ) : (
          setAuthModalState({ open: true, view: "login" })
        )}
      </>
      <>
        {/* <Flex bg="#192734" color="brand.200">
          <Text>Add options for filter pedals / sort by</Text>
        </Flex> */}
      </>
    </PageContent>
  );
};
export default addPedalPage;
