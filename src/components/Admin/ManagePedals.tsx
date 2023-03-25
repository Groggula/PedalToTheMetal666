import { pedalState, Pedal } from "@/src/atoms/pedalsAtom";
import { firestore, storage } from "@/src/firebase/config";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const ManagePedals: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pedals, setPedals] = useRecoilState(pedalState);
  const router = useRouter();

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

  const handleEdit = (pedal: Pedal) => {
    setPedals((prev) => ({
      ...prev,
      selectedPedal: null,
    }));
    router.push(`/pedals/${pedal.id}/editPedal`);
  };

  const handleDelete = async (pedal: Pedal) => {
    setLoading(true);
    try {
      // check for image in db, delete if exists
      if (pedal.image) {
        const imageRef = ref(storage, `pedals/${pedal.id}/image`);
        await deleteObject(imageRef);
      }
      // delete pedal from firestore
      const pedalDocRef = doc(firestore, "pedals", pedal.id!);
      await deleteDoc(pedalDocRef);
      // update recoil state
      setPedals((prev) => ({
        ...prev,
        pedals: prev.pedals.filter((item) => item.id !== pedal.id),
      }));
    } catch (error: any) {
      console.log("handleDelete error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  console.log(pedals.selectedPedal);

  useEffect(() => {
    if (pedals.pedals.length <= 0) {
      loadPedalsFromFirestore();
    }
  }, []);

  return (
    <Flex width="100%" direction="column">
      <Flex justify="center" pt={2}>
        <Flex width="60%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.500" mb={1} />}
            />
            <Input
              placeholder="Search"
              fontSize="10pt"
              _placeholder={{ color: "gray.500" }}
              _hover={{
                border: "1px solid",
                borderColor: "brand.200",
              }}
              _focus={{
                outline: "none",
                border: "1px solid",
                bg: "#22303c",
                borderColor: "brand.200",
              }}
              height="34px"
              bg="#22303c"
              border="none"
            />
          </InputGroup>
        </Flex>
      </Flex>
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
          {pedals && (
            <Tbody>
              {pedals.pedals.map((item) => (
                <Tr
                  key={item.id}
                  bg="#22303c"
                  _hover={{ background: "#15202B" }}
                >
                  <Td border="none">{item.title}</Td>
                  <Td border="none" isNumeric>
                    <Button
                      size="sm"
                      height="30px"
                      marginRight={1}
                      borderRadius={8}
                      background="green.500"
                      _hover={{ background: "green.400" }}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      height="30px"
                      borderRadius={8}
                      background="red.500"
                      _hover={{ background: "red.400" }}
                      onClick={() => handleDelete(item)}
                      isLoading={loading}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Flex>
    </Flex>
  );
};
export default ManagePedals;
