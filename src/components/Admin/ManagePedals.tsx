import { pedalState, Pedal } from "@/src/atoms/pedalsAtom";
import { firestore } from "@/src/firebase/config";
import {
  Box,
  Flex,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type ManagePedalsProps = {};

const ManagePedals: React.FC<ManagePedalsProps> = () => {
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
    if (pedals.pedals.length <= 0) {
      loadPedalsFromFirestore();
    }
  }, []);

  return (
    <Flex justify="center">
      <Table
        size="sm"
        variant="simple"
        maxWidth="60%"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 5px",
        }}
      >
        <Tbody>
          {pedals.pedals.map((item) => (
            <Tr key={item.id} bg="#22303c" _hover={{ background: "#15202B" }}>
              <Td border="none">{item.title}</Td>
              <Td border="none" isNumeric>
                Edit | Delete
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};
export default ManagePedals;
