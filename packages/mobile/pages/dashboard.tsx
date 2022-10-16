import type { NextPage } from "next";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Storage } from "@capacitor/storage";
import { useRouter } from "next/router";
import PageLayout from "../components/Layout/PageLayout";
import getAPI from "../getAPI";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const Folder = ({
  active,
  name,
  setActive,
}: {
  active?: boolean;
  name: string;
  setActive: (name: string) => void;
}): JSX.Element => {
  const color = stringToColor(name);

  return (
    <HStack
      background={active ? "#121212" : "rgba(0,0,0,0)"}
      py={3}
      px={4}
      borderRadius={"10px 0 0 10px"}
      transition={"all 0.2s ease-in-out"}
      _hover={{
        cursor: "pointer",
        background: active ? "#121212" : "rgba(0,0,0,0.2)",
      }}
      as={"button"}
      onClick={() => {
        if (!active) setActive(name);
        else setActive("");
      }}
    >
      <Box
        backgroundColor={color}
        borderRadius={"50%"}
        height={"10px"}
        width={"10px"}
      />

      <Box as={"button"} color={"white"} paddingLeft={"10px"} fontSize={"15px"}>
        #{name}
      </Box>
    </HStack>
  );
};

const FolderButton = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef(null);

  const router = useRouter();

  const createFolder = async () => {
    const { value: username } = await Storage.get({ key: "name" });
    await getAPI(username ?? "").post("/folder", {
      folderName: initialRef.current?.value,
    });
    router.reload();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        pl={0}
        variant={"ghost"}
        colorScheme={"whiteAlpha"}
        _hover={{
          backgroundColor: "rgba(255,255,255,0)",
        }}
      >
        + Create a new folder here
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Folder Name</FormLabel>
              <Input ref={initialRef} placeholder={"Folder name"} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"green"} mr={3} onClick={createFolder}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type Note = {
  _id: string;
  title: string;
  summary: string;
};

type FolderType = {
  name: string;
};

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("");

  const [folders, setFolders] = useState<string[]>([]);

  const [notes, setNotes] = useState<Note[]>([]);

  const [selection, setSelection] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    Storage.get({ key: "name" }).then(({ value }) => {
      setUsername(value as string);
      if (!value) router.push("/login");

      getAPI(value as string)
        .get("/dashboard")
        .then((data) => {
          setFolders(data.folders.map((folder: FolderType) => folder.name));
          setNotes(data.notes);
        });
    });
  }, [router]);

  return (
    <PageLayout title={"Dashboard | Annote: Your live study helper."}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          width: "20%",
          backgroundColor: "#282828",
          paddingLeft: "30px",
        }}
      >
        <Box>
          <Heading
            style={{
              color: "white",
              fontSize: "45px",
              backgroundColor: "black",
              width: "calc(100% + 60px)",
              height: "80px",
              marginLeft: "-60px",
              paddingLeft: "70px",
              paddingTop: "12px",
            }}
          >
            Annote.
          </Heading>
          <Divider
            borderColor={"white"}
            marginLeft={"-60px"}
            width={"calc(100%)+60px"}
          />

          {/* Current Notes */}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              paddingTop: "10px",
              backgroundColor: "#282828",
            }}
          >
            {folders.map((folder) => (
              <Folder
                name={folder}
                setActive={setSelection}
                active={selection === folder}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <FolderButton />
          <Divider
            borderColor={"white"}
            marginLeft={"-60px"}
            width={"calc(100%)+60px"}
          />
          <Box
            style={{
              color: "slategrey",
              backgroundColor: "Black",
              marginLeft: "-60px",
              height: "65px",
              paddingTop: "20px",
              paddingLeft: "60px",
            }}
          >
            {username}
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Home;
