import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import { firestore } from "@/src/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const fetchPedals = async () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pedals, setPedals] = useRecoilState(pedalState);
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
