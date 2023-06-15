import PageContent from "@/src/components/Layout/PageContent";
import Profile from "@/src/components/User/Profile";
import { auth } from "@/src/firebase/config";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <Profile user={user!} />
      <>{/* maybe add more boxes here */}</>
    </PageContent>
  );
};
export default index;
