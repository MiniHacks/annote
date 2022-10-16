import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import theme from "../theme";

// import all roboto slab fonts
import "@fontsource/roboto-slab/latin-300.css";
import "@fontsource/roboto-slab/latin-400.css";
import "@fontsource/roboto-slab/latin-500.css";
import "@fontsource/roboto-slab/latin-600.css";
import "@fontsource/roboto-slab/latin-700.css";
import "@fontsource/roboto-slab/latin-900.css";

import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

// put sess
export default MyApp;
