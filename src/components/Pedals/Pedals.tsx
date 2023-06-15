import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import { firestore } from "@/src/firebase/config";
import { Wrap, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import PedalItem from "./PedalItem";

const Pedals: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [pedalStateValue, setPedalStateValue] = useRecoilState(pedalState);

  const loadPedalsFromFirestore = async () => {
    setLoading(true);
    try {
      const pedalsDocRef = collection(firestore, "pedals");
      const pedalsDoc = await getDocs(pedalsDocRef);
      const pedals = pedalsDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedalStateValue((prev) => ({
        ...prev,
        selectedPedal: null,
        pedals: pedals as Pedal[],
      }));
    } catch (error: any) {
      console.log("loadPedals error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pedalStateValue.pedals.length <= 0) {
      loadPedalsFromFirestore();
    }
  }, []);
  return (
    <>
      {!error ? (
        pedalStateValue && (
          <Wrap p={2}>
            {pedalStateValue.pedals.map((item) => (
              <PedalItem key={item.id} pedal={item} loading={loading} />
            ))}
          </Wrap>
        )
      ) : (
        <Text color="red.500" align="center">
          {error}
        </Text>
      )}
    </>
  );
};
export default Pedals;
