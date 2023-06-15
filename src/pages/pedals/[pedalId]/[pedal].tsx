import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import PedalItem from "@/src/components/Pedals/PedalItem";
import { auth, firestore } from "@/src/firebase/config";
import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const PedalPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
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
    <Flex>
      {selectedPedalState.selectedPedal && (
        <PedalItem pedal={selectedPedalState.selectedPedal} loading={loading} />
      )}
    </Flex>
  );
};
export default PedalPage;
