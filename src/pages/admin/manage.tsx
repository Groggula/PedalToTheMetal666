import { authModalState } from "@/src/atoms/authModalAtom";
import ManagePedals from "@/src/components/Admin/ManagePedals";
import ManageUsers from "@/src/components/Admin/ManageUsers";
import PageContent from "@/src/components/Layout/PageContent";
import { auth } from "@/src/firebase/config";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type ManagePageProps = {
  // showUserList: boolean;
  // showPedalList: boolean;
};

const ManagePage: React.FC<ManagePageProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <PageContent>
      <>
        {user ? (
          <ManagePedals />
        ) : (
          // showUserList && <ManageUsers />
          setAuthModalState({ open: true, view: "login" })
        )}
      </>
      <></>
    </PageContent>
  );
};
export default ManagePage;
