import {
  Box,
  Flex,
  Icon,
  MenuItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuSprout } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";

import { CommunityState } from "../../atoms/CommunitiesAtom";
import CreateCommunityModel from "../../components/Modal/CreateCommunity/CreateCommunityModel";
import MenuListItem from "./MenuListItem";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(CommunityState).mySnippets;
  const hoverBg = useColorModeValue("gray.200", "#2A4365");
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <CreateCommunityModel open={open} handleClose={() => setOpen(false)} />

      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color={textColor}>
          MODERATING
        </Text>
        {mySnippets
          .filter((item) => item.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={LuSprout}
              displayText={`${snippet.communityId}`/*r!*/}
              link={`/${snippet.communityId}`/*r!*/}
              iconColor={"brand.100"}
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>

      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color={textColor}>
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: hoverBg }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Flex align="center">
            <Icon as={GrAdd} mr={2} color="white" />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={LuSprout}
            displayText={`${snippet.communityId}`/*r!*/}
            link={`/${snippet.communityId}`/*r!*/}
            iconColor={"green.500"}
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Communities;
