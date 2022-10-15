import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto Slab', sans-serif`,
    body: `Inter, sans-serif`,
  },
  fontWeights: {
    heading: 700,
  },
});

export default theme;
