import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import AdminPanel from "@/src/components/Admin/AdminPanel";
import PageContent from "@/src/components/Layout/PageContent";
import EditPedal from "@/src/components/Pedals/EditPedal";
import InputFields from "@/src/components/Pedals/PedalForm.tsx/InputFields";
import { auth, firestore } from "@/src/firebase/config";
import { Box, Flex, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const editPedalPage: React.FC<Pedal> = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedPedalState, setSelectedPedalState] =
    useRecoilState(pedalState);

  const fetchPedal = async (pedalId: string) => {
    try {
      setLoading(true);
      const pedalDocRef = doc(firestore, "pedals", pedalId);
      const pedalDoc = await getDoc(pedalDocRef);
      setSelectedPedalState((prev) => ({
        ...prev,
        selectedPedal: { id: pedalDoc.id, ...pedalDoc.data() } as Pedal,
      }));
    } catch (error: any) {
      console.log("fetchPedal err", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { pedalId } = router.query;
    if (pedalId && !selectedPedalState.selectedPedal) {
      fetchPedal(pedalId as string);
    }
  }, [router.query, selectedPedalState.selectedPedal]);

  return (
    <PageContent>
      {user && (
        <Flex justify="center">
          {loading ? (
            <Box justifyContent="center" width="60%" height="100%" mt={2}>
              <SkeletonText noOfLines={7} spacing="4" skeletonHeight="5" />
            </Box>
          ) : (
            <EditPedal pedal={selectedPedalState.selectedPedal!} />
          )}
        </Flex>
      )}
      <>{user && <></>}</>
    </PageContent>
  );
};
export default editPedalPage;
