import React from "react";
import { Stack, Box, SkeletonText, Skeleton } from "@chakra-ui/react";

const Loader: React.FC = () => {
  return (
    <Stack spacing={6}>
      <Box
        padding="10px 10px"
        boxShadow="lg"
        bg="#22303c"
        borderRadius={15}
        width="200px"
        height="350px"
      >
        <Skeleton mt="1" height="150px" />
        <SkeletonText mt="4" noOfLines={4} spacing="5" />
      </Box>
    </Stack>
  );
};
export default Loader;
