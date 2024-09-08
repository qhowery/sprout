import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import ConversationsWrapper from "../components/Conversations/ConversationsWrapper";
import FeedWrapper from "../components/Feed/FeedWrapper";
import NoConversationSelected from "../components/Feed/NoConversationSelected";
import { auth } from "../firebase/clientApp";

type Props = {};

function ChatRoom({}: Props) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {
    query: { userInCommunities, member },
  } = router;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Sprout</title>
        <meta name="description" content="Share your big idea with the world" />
        <link rel="icon" href="/images/header.png" />
      </Head>
      <Flex height="100vh" overflow="hidden">
        <ConversationsWrapper />
        {user ? (
          <FeedWrapper
            user={user as User}
            userInCommunities={userInCommunities as string}
            member={member}
          />
        ) : (
          <Flex
            display={{ base: userInCommunities ? "flex" : "none", md: "flex" }}
            direction="column"
            width="100%"
          >
            <NoConversationSelected />
          </Flex>
        )}
      </Flex>
    </motion.div>
  );
}

export default ChatRoom;
