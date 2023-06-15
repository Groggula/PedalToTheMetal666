import { Button, Flex, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type InputFieldsProps = {
  textInputs: {
    title: string;
    effectType: string;
    company: string;
    companyURL: string;
    image: string;
    price: number;
  };
  selectedFile?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCreatePedal: () => void;
  loading: boolean;
  createOrEditBtn: string;
};

const effectTypes = [
  {
    title: "Distortion",
  },
  {
    title: "Overdrive",
  },
  {
    title: "Delay",
  },
  {
    title: "Reverb",
  },
  {
    title: "Fuzz",
  },
  {
    title: "Chorus",
  },
  {
    title: "Flanger",
  },
  {
    title: "Phaser",
  },
  {
    title: "Other",
  },
];

const InputFields: React.FC<InputFieldsProps> = ({
  textInputs,
  onChange,
  handleCreatePedal,
  loading,
  selectedFile,
  createOrEditBtn,
}) => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs?.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        border="none"
        bg="#22303c"
        color="white"
        _placeholder={{ color: "gray.500" }}
      />
      <Input
        name="company"
        value={textInputs?.company}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Company"
        border="none"
        bg="#22303c"
        color="white"
        _placeholder={{ color: "gray.500" }}
      />
      <Input
        name="companyURL"
        value={textInputs?.companyURL}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="https://"
        border="none"
        bg="#22303c"
        color="white"
        _placeholder={{ color: "gray.500" }}
      />
      <Select
        name="effectType"
        value={textInputs?.effectType}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Effect Type"
        border="none"
        bg="#22303c"
        color="gray.500"
        _placeholder={{ color: "gray.500" }}
      >
        {effectTypes.map((item) => (
          <option key={item.title} value={item.title}>
            {item.title}
          </option>
        ))}
      </Select>
      {selectedFile ? (
        <>
          <Text color="gray.500" fontSize="10pt" pl={2}>
            Image OK!
          </Text>
        </>
      ) : (
        <Input
          name="image"
          value={textInputs?.image}
          onChange={onChange}
          fontSize="10pt"
          borderRadius={4}
          border="none"
          bg="#22303c"
          color="white"
          placeholder="Image URL or select an image for upload"
          _placeholder={{ color: "gray.500" }}
        />
      )}
      <Input
        name="price"
        value={textInputs?.price}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Price payed in euro"
        border="none"
        bg="#22303c"
        color="white"
        _placeholder={{ color: "gray.500" }}
      />

      <Flex justify="center">
        <Button
          height="35px"
          mr={2}
          disabled={!textInputs?.title}
          isLoading={loading}
          onClick={handleCreatePedal}
        >
          {createOrEditBtn}
        </Button>
        <Button
          bg="red.600"
          _hover={{ bg: "red.500" }}
          height="35px"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Flex>
    </Stack>
  );
};
export default InputFields;
