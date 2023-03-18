import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import AdminPanel from "@/src/components/Admin/AdminPanel";
import PageContent from "@/src/components/Layout/PageContent";
import EditPedal from "@/src/components/Pedals/EditPedal";
import InputFields from "@/src/components/Pedals/PedalForm.tsx/InputFields";
import { auth, firestore } from "@/src/firebase/config";
import { Flex, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const editPedalPage: React.FC<Pedal> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [selectedPedalState, setSelectedPedalState] =
    useRecoilState(pedalState);

  const fetchPedal = async (pedalId: string) => {
    try {
      const pedalDocRef = doc(firestore, "pedals", pedalId);
      const pedalDoc = await getDoc(pedalDocRef);
      setSelectedPedalState((prev) => ({
        ...prev,
        selectedPedal: { id: pedalDoc.id, ...pedalDoc.data() } as Pedal,
      }));
    } catch (error: any) {
      console.log("fetchPedal err", error.message);
    }
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
          <EditPedal pedal={selectedPedalState.selectedPedal!} />
        </Flex>
      )}
      <>{user && <AdminPanel />}</>
    </PageContent>
  );
};
export default editPedalPage;
