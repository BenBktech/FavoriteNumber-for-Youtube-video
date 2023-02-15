import { Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
    return (
        <Flex
        height='15vh'
            p="2rem"
            justifyContent="space-between"
            alignItems="center"
        >
            <Text>Logo</Text>
            <ConnectButton />
        </Flex>
    )
}

export default Header;