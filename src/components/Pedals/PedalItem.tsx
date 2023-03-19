import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";
import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import Loader from "./Loader";

type PedalItemProps = {
  pedal: Pedal;
  loading: boolean;
};

const PedalItem: React.FC<PedalItemProps> = ({ pedal, loading }) => {
  const router = useRouter();
  const [selectedPedalState, setSelectedPedalState] =
    useRecoilState(pedalState);

  const handleEdit = (pedal: Pedal) => {
    setSelectedPedalState((prev) => ({
      ...prev,
      selectedPedalState: pedal,
    }));
    router.push(`/pedals/${pedal.id}/editPedal`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Flex
          height="350px"
          bg="#22303c"
          color="white"
          width="200px"
          minWidth="200px"
          direction="column"
          margin={1}
          borderRadius={15}
          boxShadow="base"
        >
          <Flex height="45%" justify="center">
            <Image src={pedal.image} alt="pedal image not found" />
          </Flex>
          <Stack height="50%" margin={3} fontSize="10pt">
            <Text fontSize="12pt" fontWeight={700}>
              {pedal.title}
            </Text>
            <Text>{pedal.effectType}</Text>
            <Text>
              Rating: &#11088; {pedal.rating} ({pedal.ratingCount})
            </Text>
            <Link href={`${pedal.companyURL}`} target="_blank">
              <Text color="brand.200" _hover={{ textDecoration: "underline" }}>
                {pedal.company}
              </Text>
            </Link>
            <Flex justify="center" pt={5} gap="2">
              <Button height="35px" width="100px">
                Add
              </Button>
              <Button
                onClick={() => handleEdit(pedal)}
                variant="danger"
                height="35px"
                width="100px"
              >
                Edit
              </Button>
            </Flex>
          </Stack>
        </Flex>
      )}
    </>
    // add extended content for single page views, youtube demo etc...
  );
};
export default PedalItem;
