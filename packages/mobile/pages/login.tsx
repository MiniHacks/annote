import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Storage } from "@capacitor/storage";
import { useRouter } from "next/router";

const setName = async (name: string) => {
  await Storage.set({
    key: "name",
    value: name,
  });
};

export default function Login(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    setName("samyok").then(() => {
      router.push("/dashboard");
    });
  }, [router]);

  return <Box>hi</Box>;
}
