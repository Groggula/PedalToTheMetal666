import ManagePedals from "@/src/components/Admin/ManagePedals";
import ManageUsers from "@/src/components/Admin/ManageUsers";
import PageContent from "@/src/components/Layout/PageContent";
import React from "react";

type ManagePageProps = {
  showUserList: boolean;
  showPedalList: boolean;
};

const ManagePage: React.FC<ManagePageProps> = ({
  showPedalList,
  showUserList,
}) => {
  return (
    <PageContent>
      {!showPedalList && <ManagePedals />}
      {showUserList && <ManageUsers />}
    </PageContent>
  );
};
export default ManagePage;
