import {
  Flex,
  Icon,
  MenuItem,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import useDirectory from "../../hooks/useDirectory";
import { getDownloadURL, ref } from "firebase/storage"; // Import Firebase Storage functions
import { storage } from "../../firebase/clientApp"; // Your Firebase config

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
  storagePath?: string; // Add an optional storagePath prop
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
  storagePath, // Optional path to pull from Firebase Storage
}) => {
  const { onSelectMenuItem } = useDirectory();
  const hoverBg = useColorModeValue("gray.100", "#2A4365");
  const [downloadURL, setDownloadURL] = useState<string | null>(imageURL || null);

  // Fetch the image from Firebase Storage if storagePath is provided
  useEffect(() => {
    const fetchImageURL = async () => {
      if (!imageURL && storagePath) {
        try {
          const url = await getDownloadURL(ref(storage, storagePath));
          setDownloadURL(url);
        } catch (error) {
          console.log("Error fetching image from storage:", error);
        }
      }
    };
    fetchImageURL();
  }, [imageURL, storagePath]);

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: hoverBg }}
      onClick={() => {
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL });
      }}
    >
      <Flex alignItems="center">
        {downloadURL ? (
          <Image borderRadius="full" boxSize="18px" src={downloadURL} mr={2} />
        ) : (
          <Icon fontSize={20} mr={2} as={icon} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
