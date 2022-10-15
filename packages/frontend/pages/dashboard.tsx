import type { NextPage } from "next";
import {
  background,
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
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import PageLayout from "../components/Layout/PageLayout";
import React, { useState } from "react";

//TODO:
//      Write the functions so we can set the new folder names
//      FONTS
//      Allow users to select colors.

//  function createFolder() {
//      const [folderName, setFolderName] = useState("");
//
//      const toggleFolder = () => {
//          setFolderName(folderName);
//      }
//
//      return (
//             <div className={"createFolder"}>
//                 <Button onClick{toggleFolder}>Create Folder</Button>
//                 <Input placeholder={"Folder Name"} onChange={e => setFolderName(e.target.value)} value={folderName}/>
//             </div>
//         );
//  }
//
// function newFolder() {
//     return (
//         <div>
//             <input type="text" id="message" placeholder="Enter Folder Name"/>
//             <button type="button" onClick={Folder}>Create Folder</button>
//         </div>
//     )
// }

const Folder = ({ active }): JSX.Element => {
  return (
    <HStack
      background={active ? "gray.900" : "transparent"}
      py={3}
      px={4}
      borderRadius={"10px 0 0 10px"}
    >
      <Box
        backgroundColor={"#ff9090"}
        borderRadius={"50%"}
        height={"10px"}
        width={"10px"}
      />

      <Box as={"button"} color={"white"} paddingLeft={"10px"} fontSize={"15px"}>
        This is your task here
      </Box>
    </HStack>
  );
};

const FolderButton = (): JSX.Element => {
  const [mode, setMode] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        colorScheme="whiteAlpha"
        hover={"#282828"}
      >
        + Create a new folder here
      </Button>
      {/*<Button ml={4} ref={finalRef}></Button>*/}

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
              <Input ref={initialRef} placeholder="Folder name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// const FolderButton = (): JSX.Element => {
//     const [mode, setMode] = useBoolean(false);
//     if (mode) {
//         return <InitialFocus />;
//     } else {
//         return (
//             <Button
//                 variant="ghost"
//                 onClick={setMode.toggle}
//                 colorScheme="whiteAlpha"
//                 hover={"#282828"}
//             >
//                 + Create a new folder here
//             </Button>
//         );
//     }
// };

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
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
            borderColor="white"
            marginLeft={"-60px"}
            width={"calc(100%)+60px"}
          />

          {/*Current Notes*/}
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
            <Folder />
            <Folder active={true} />
            <Folder />
          </Box>
        </Box>
        <Box>
          {/*TODO: Remove Hover
                             Make a function that makes a new folder*/}
          {/*Create Folder Button*/}
          <FolderButton />
          {/*Email here*/}
          <Divider
            borderColor="white"
            marginLeft={"-60px"}
            width={"calc(100%)+60px"}
          />
          <Box
            style={{
              color: "white",
              paddingTop: "10px",
              backgroundColor: "Black",
              marginLeft: "-60px",
              height: "65px",
              paddingTop: "20px",
              paddingLeft: "60px",
            }}
          >
            sam@yok.dev
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Home;
