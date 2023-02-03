import { FC, useState, useRef, useEffect } from "react";
import Link from "next/link";

import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

import Logo from "./Logo";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  const toggleNav = (visibility: boolean) => {
    const currentNav = navRef.current;
    if (!currentNav) {
      return;
    }
    const { classList } = currentNav;
    if (visibility) {
      // Hide nav
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // Show nav
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    setVisible(() => !visible);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(!visible));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      // App is being rendered for the first time and initial state is true
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="flex flex-col justify-between h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark transition-width overflow-hidden sticky top-0"
    >
      <div>
        <Link href={"/admin"} legacyBehavior>
          <a className="flex item-center space-x-2 p-3 mb-10">
            <Logo className="w-6 h-6 fill-highlight-light dark:fill-highlight-dark" />
            {visible && (
              <span className="text-xl font-semibold text-highlight-light dark:text-highlight-dark leading-none">
                Admin
              </span>
            )}
          </a>
        </Link>
        <div className="space-y-6">
          {navItems.map((item) => (
            <Link href={item.href} legacyBehavior key={item.label}>
              <a className="flex items-center text-xl text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition">
                <item.icon size={24} />
                {visible && (
                  <span className="ml-2 capitalize leading-none">
                    {item.label}
                  </span>
                )}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="self-end text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition"
        onClick={updateNavState}
      >
        {visible ? (
          <RiMenuFoldFill size={24} />
        ) : (
          <RiMenuUnfoldFill size={24} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
