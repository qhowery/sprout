import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CommunityState } from "../atoms/CommunitiesAtom";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";
import { LuSprout } from "react-icons/lu";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();
  const communityStateValue = useRecoilValue(CommunityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `${currentCommunity.id}`/*r!*/,
          link: `/${currentCommunity.id}`/*r!*/,
          imageURL: currentCommunity.imageURL,
          icon: LuSprout,
          iconColor: "green.500",
        },
      }));
    }
  }, [communityStateValue.currentCommunity]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
