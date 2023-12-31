import React, { useEffect, useState } from "react";
import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "@/src/firebase/config";
import useSelectFile from "@/src/hooks/useSelectFile";
import CreatePedal, { formTabs } from "./CreatePedal";
import { Flex, Alert, AlertIcon, Text, Button } from "@chakra-ui/react";
import ImageUpload from "../Pedals/PedalForm.tsx/ImageUpload";
import TabItem from "../Pedals/TabItem";
import InputFields from "../Pedals/PedalForm.tsx/InputFields";
import { useRouter } from "next/router";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRecoilState } from "recoil";

type EditPedalProps = {
  pedal: Pedal;
};

const EditPedal: React.FC<EditPedalProps> = ({ pedal }) => {
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [pedalStateValue, setPedalStateValue] = useRecoilState(pedalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editPedal, setEditPedal] = useState(pedal);
  const router = useRouter();

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditPedal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditPedal = async (id: string) => {
    const newValues = {
      title: editPedal.title,
      effectType: editPedal.effectType,
      company: editPedal.company,
      companyURL: editPedal.companyURL,
      image: editPedal.image,
      price: editPedal.price,
    };
    setLoading(true);

    try {
      const pedalDocRef = doc(firestore, "pedals", id);
      console.log(pedalDocRef);

      await updateDoc(pedalDocRef, newValues);
      // check for image, if => upload to storage, then update doc with URL
      if (selectedFile) {
        const imageRef = ref(storage, `pedals/${pedalDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(pedalDocRef, {
          image: downloadURL,
        });
      }

      //update state with new values of selected pedal
      setPedalStateValue((prev) => ({
        ...prev,
        pedals: prev.pedals.map((item) => {
          if (item.id === id) {
            return {
              ...pedal,
              title: editPedal.title,
              effectType: editPedal.effectType,
              company: editPedal.company,
              companyURL: editPedal.companyURL,
              image: editPedal.image,
              price: editPedal.price,
            };
          } else {
            return item;
          }
        }),
      }));
    } catch (error: any) {
      console.log("handleEditPedal error", error.message);
      setError(error.message);
    }

    setLoading(false);
    router.push("/pedals");
  };

  useEffect(() => {
    if (!pedal) return;
    setEditPedal(pedal);
  }, [pedal]);

  return (
    <Flex
      width="60%"
      direction="column"
      borderRadius={2}
      mt={2}
      mb={2}
      bg="#192734"
    >
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      {editPedal && (
        <Flex p={4}>
          {selectedTab === "Pedal info" && (
            <InputFields
              textInputs={editPedal}
              onChange={handleTextChange}
              loading={loading}
              handleCreatePedal={() => handleEditPedal(editPedal.id!)}
              selectedFile={selectedFile}
              createOrEditBtn="Save & Update"
            />
          )}

          {selectedTab === "Image" && (
            <ImageUpload
              selectedFile={selectedFile}
              onSelectImage={onSelectFile}
              setSelectedTab={setSelectedTab}
              setSelectedFile={setSelectedFile}
            />
          )}
        </Flex>
      )}
      {error && (
        <Alert bg="red.600" status="error">
          <AlertIcon />
          <Text>Error updating pedal</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default EditPedal;
