import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Flex,
  Icon,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { GrAdd } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";

import { signOut, User } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import Link from "next/link";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 5px"
        borderRadius={4}
        _hover={{ backgroundColor: "#22303c" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Image
                  src={user?.photoURL! || "/images/sd1.svg"}
                  borderRadius="full"
                  height="30px"
                  mr={1}
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="white" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList bg="#192734" border="none">
        {user ? (
          <>
            <Link href={`/user/${user!.uid}/`}>
              <MenuItem
                fontSize="10pt"
                fontWeight={700}
                bg="#192734"
                _hover={{ bg: "#22303c" }}
              >
                <Flex align="center">
                  <Icon fontSize={20} mr={2} as={CgProfile} />
                  Profile
                </Flex>
              </MenuItem>
            </Link>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              bg="#192734"
              _hover={{ bg: "#22303c" }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={GrAdd} />
                Add Pedal
              </Flex>
            </MenuItem>
            <MenuDivider borderColor="brand.200" />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              bg="#192734"
              _hover={{ bg: "#22303c" }}
              onClick={() => signOut(auth)}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
