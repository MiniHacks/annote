import {useState} from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {NextPage} from "next";
import {useSession} from "next-auth/react";
import PageLayout from "../components/Layout/PageLayout";

const NavBar = (): JSX.Element => {
    return (
        <Box backgroundColor={"blackAlpha.900"} color={"white"} px={"5%"} py={3}>
            <HStack justifyContent={"space-between"}>
                <Heading fontSize={"35px"}>Annote.</Heading>
                <HStack>
                    <Button colorScheme={"whiteAlpha"} variant={"ghost"}>
                        Features
                    </Button>
                    <Button
                        colorScheme={"whiteAlpha"}
                        variant={"ghost"}
                        onClick={() => window.open("http://localhost:3000/landingpage")}
                    >
                        Download
                    </Button>
                    <Button
                        onClick={() => window.open("http://localhost:3000/login")}
                        colorScheme={"whiteAlpha"}
                        variant={"solid"}
                    >
                        Sign up
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
};

const Home: NextPage = () => {
    // get user info from session
    const { data: session, status } = useSession();
    // if user is logged in, redirect to profile page
    if (status === "authenticated") {
        window.location.href = "/profile";
    }
    console.log(status);

    return (
        <PageLayout title={"geese, by minihacks"}>
            <Box backgroundColor={"yellow.50"} minHeight={"100vh"}>
                <NavBar />
                <Box>
                    <VStack spacing={8} py={20}
                            minHeight={"500px"} justifyContent={"center"}>
                        <Heading
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <SimpleCard />
                        </Heading>
                    </VStack>
                </Box>
            </Box>
        </PageLayout>
    );
};

function ViewIcon() {
    return null;
}

function ViewOffIcon() {
    return null;
}

function SimpleCard() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Flex
            minH={"25vh"}
            rounded={"lg"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("blackAlpha.900", "gray.800")}
            boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={7}>
                <Stack align={"center"}>
                    <Heading fontSize={"3xl"} color={"whiteAlpha.900"}>
                        Sign in to your account
                    </Heading>
                    <Text fontSize={"lg"} color={"whiteAlpha.800"}>
                        to view your Annotes and{" "}
                        <Link onClick={() => window.open("http://localhost:3000/landingpage")}
                              color={"whiteAlpha.800"}
                              textDecoration={"underline"}>
                            more!
                        </Link>
                        ✎
                    </Text>
                </Stack>
                <Box>
                    <Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blackAlpha.900'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'darkgrey',
                                        }}>
                                        Sign in
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Home;
