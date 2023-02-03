import { NextPage } from "next";
import AdminLayout from "@/components/layout/AdminLayout";

interface Props {}

const Admin: NextPage<Props> = (): JSX.Element => {
  return (
    <AdminLayout>
      <div>This is ADMIN</div>
    </AdminLayout>
  );
};

export default Admin;
