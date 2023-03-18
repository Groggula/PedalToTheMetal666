import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import PedalItem from "@/src/components/Pedals/PedalItem";
import { auth, firestore } from "@/src/firebase/config";
import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

// const onSelectPost = (post: Post) => {
//   setPostStateValue((prev) => ({
//     ...prev,
//     selectedPost: post,
//   }));
//   router.push(`/r/${post.communityId}/comments/${post.id}`);
// };

const PedalPage: React.FC = () => {
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
    <Flex>
      {selectedPedalState.selectedPedal && (
        <PedalItem pedal={selectedPedalState.selectedPedal} />
      )}
    </Flex>
  );
};
export default PedalPage;
