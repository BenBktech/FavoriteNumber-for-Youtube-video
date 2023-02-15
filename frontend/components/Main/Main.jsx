import { Flex, Input, Text, Button, Heading, Alert, AlertIcon, useToast, Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount, useProvider, useSigner } from 'wagmi'
import Contract from '../../../backend/artifacts/contracts/SimpleStorage.sol/SimpleStorage.json'
import { ethers } from "ethers";

const Main = () => {

    const { address, isConnected } = useAccount()
    const provider = useProvider()
    const { data: signer } = useSigner()
    const toast = useToast()

    const [favoriteNumberInput, setFavoriteNumberInput] = useState(null)
    const [favoriteNumberInBlockchain, setFavoriteNumberInBlockchain] = useState(null)

    useEffect(() => {
        if(isConnected) {
            getDatas()
        }
    }, [address])

    const getDatas = async() => {
        const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Contract.abi, provider)
        let favoriteNumber = await contract.getNumber()
        setFavoriteNumberInBlockchain(favoriteNumber.toString())
    }

    const changeFavoriteNumber = async() => {
        try {
            const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Contract.abi, signer)
            let transaction = await contract.setNumber(favoriteNumberInput)
            await transaction.wait(1)
            getDatas()
            toast({
                title: 'Félicitations !',
                description: "Le nombre favoris a été changé.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        catch {
            toast({
                title: 'Erreur !',
                description: "Une erreur est survenue.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }  
    }

    return (
        <Flex
            p="2rem"
            justifyContent="center"
            alignItems="center"
            height='85vh'
        >
            {isConnected ? (
                <Flex direction="column" width="100%">
                    <Card p="2rem">
                        <CardBody>
                            <Heading as='h2' size='xl' align="center">Get your favorite number in the Blockchain</Heading>
                            <Text mt="1rem" align="center">Your favorite number is : <Text as="span" fontWeight="bold">{favoriteNumberInBlockchain}</Text></Text>
                        </CardBody>
                    </Card>
                    <Card p="2rem" mt="2rem">
                        <CardBody>
                            <Heading as='h2' size='xl' align="center">Change your favorite number in the Blockchain</Heading>
                            <Input mt="1rem" placeholder="Your favorite number" onChange={(e) => setFavoriteNumberInput(e.target.value)} />
                            <Button width="100%" mt="1rem" colorScheme="orange" onClick={() => changeFavoriteNumber()}>Change</Button>
                        </CardBody>
                    </Card>
                </Flex>
            ) : (
                <Alert status='warning'>
                    <AlertIcon />
                    Please connect your Wallet
                </Alert>
            )}            
        </Flex>
    )
}

export default Main;