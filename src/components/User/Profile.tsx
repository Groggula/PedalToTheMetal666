import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRecoilState } from "recoil";
import { Pedal, pedalState } from "@/src/atoms/pedalsAtom";

type ProfileProps = {
  user: User;
};

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [pedalStateValue] = useRecoilState(pedalState);

  const calcTotalAmountSpent = (pedals: Pedal[]) => {
    const totalPrice = pedals.reduce((sum, pedal) => sum + pedal.price, 0);
    return totalPrice;
  };

  const totalAmountSpent = calcTotalAmountSpent(pedalStateValue.pedals);

  return (
    <Flex justify="center">
      <Text color="white">
        Total amount spent on pedals: € {totalAmountSpent}
      </Text>
    </Flex>
  );
};
export default Profile;
