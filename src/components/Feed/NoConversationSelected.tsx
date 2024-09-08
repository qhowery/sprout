import { Flex, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
const sproutLogo = process.env.PUBLIC_URL + '/images/header.png';

type Props = {
  user?: User;
};

function NoConversationSelected({ user }: Props) {
  return (
    <Flex height="100%" justify="center" align="center">
      <Stack spacing={10} align="center">
        <Text fontSize={40}>
          {user ? "Select a Conversation" : "You Need To Login"}
        </Text>
        <img src={sproutLogo} alt="Description" />
      </Stack>
    </Flex>
  );
}

export default NoConversationSelected;
