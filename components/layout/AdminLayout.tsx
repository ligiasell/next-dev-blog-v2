import { FC, ReactNode } from "react";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from "react-icons/ai";
import Link from "next/link";

import AdminNav from "../../components/common/AdminNav";

interface Props {
  children: ReactNode;
}

const navItems = [
  { href: "/admin", icon: AiOutlineDashboard, label: "dashboard" },
  { href: "/admin/posts", icon: AiOutlineContainer, label: "posts" },
  { href: "/admin/users", icon: AiOutlineTeam, label: "users" },
  { href: "/admin/comments", icon: AiOutlineMail, label: "comments" },
  { href: "/admin/contact", icon: AiOutlineContacts, label: "Contact" },
];

const AdminLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="flex bg-pink-400">
      <AdminNav navItems={navItems} />
      <div className="flex-1 p-4">{children}</div>
      <Link href="/admin/posts" legacyBehavior>
        <a className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-0 bottom-10 p-3 m-3 rounded-full hover:scale-90 shadow-sm transition">
          <AiOutlineFileAdd size={24} />
        </a>
      </Link>
    </div>
  );
};

export default AdminLayout;
