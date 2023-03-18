import { Flex, Alert, AlertIcon, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import InputFields from "./PedalForm.tsx/InputFields";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { firestore, storage } from "@/src/firebase/config";
import ImageUpload from "./PedalForm.tsx/ImageUpload";
import useSelectFile from "@/src/hooks/useSelectFile";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Pedal } from "@/src/atoms/pedalsAtom";

type CreatePedalProps = {
  user: User;
};

export const formTabs: TabItemType[] = [
  {
    title: "Pedal info",
    icon: IoDocumentText,
  },
  {
    title: "Image",
    icon: IoImageOutline,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

const CreatePedal: React.FC<CreatePedalProps> = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [textInputs, setTextInputs] = useState({
    title: "",
    effectType: "",
    company: "",
    companyURL: "",
    image: "",
  });

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePedal = async () => {
    const newPedal: Pedal = {
      creatorId: user?.uid,
      creatorDisplayName: user.displayName || user.email!.split("@")[0],
      title: textInputs.title,
      effectType: textInputs.effectType,
      company: textInputs.company,
      companyURL: textInputs.companyURL,
      image: textInputs.image,
      rating: 0,
      ratingCount: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      // store pedal in db
      const pedalDocRef = await addDoc(
        collection(firestore, "pedals"),
        newPedal
      );
      // check for image, if => upload to storage, then update doc with URL
      if (selectedFile) {
        const imageRef = ref(storage, `pedals/${pedalDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(pedalDocRef, {
          image: downloadURL,
        });
      }
      router.push("/pedals");
    } catch (error: any) {
      console.log("handleCreatePedal error", error);
      setError(error.message);
    }
    setLoading(false);
  };

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
      <Flex p={4}>
        {selectedTab === "Pedal info" && (
          <InputFields
            textInputs={textInputs}
            onChange={handleTextChange}
            loading={loading}
            handleCreatePedal={handleCreatePedal}
            selectedFile={selectedFile}
            createOrEditBtn="Create"
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
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text>Error creating pedal</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default CreatePedal;
