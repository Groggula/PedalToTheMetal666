import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ffffff",
      200: "#8899A6",
    },
  },
  fonts: {
    body: "Roboto, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#15202B",
      },
    }),
  },
  components: {
    Button,
  },
});
