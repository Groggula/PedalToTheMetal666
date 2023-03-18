import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import { auth, firestore } from "@/src/firebase/config";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import CreatePedal from "./CreatePedal";
import PedalItem from "./PedalItem";

type PedalsProps = {};

const Pedals: React.FC<PedalsProps> = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pedals, setPedals] = useRecoilState(pedalState);

  const loadPedalsFromFirestore = async () => {
    setLoading(true);
    try {
      const pedalsDocRef = collection(firestore, "pedals");
      const pedalsDoc = await getDocs(pedalsDocRef);
      const pedals = pedalsDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedals((prev) => ({
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
    loadPedalsFromFirestore();
  }, []);

  return (
    <Wrap p={2}>
      {pedals.pedals.map((item) => (
        <PedalItem key={item.id} pedal={item} />
      ))}
    </Wrap>
  );
};
export default Pedals;
