import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "20px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "blue.600",
      _hover: {
        bg: "blue.400",
      },
    },
    danger: {
      color: "white",
      bg: "red.600",
      _hover: {
        bg: "red.400",
      },
    },
    outline: {
      color: "white",
      border: "1px solid",
      borderColor: "blue.600",
      _hover: {
        bg: "blue.400",
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",

      borderColor: "gray.300",
      _hover: {
        bg: "gray.300",
      },
    },
  },
};
