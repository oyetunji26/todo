"use client";

import getFormattedDate from "@/utils/formattedDate";
import React, { useEffect, useState } from "react";
import { FiSearch, FiBell, FiCalendar } from "react-icons/fi";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

const TopBar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any | null>(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);
  console.log("Session prof", session);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <div className="flex items-center justify-between text-theme">
      <h2 className="font-bold !text-[20px]">
        Welcome back, {session?.user?.name?.split(" ")[0]} 👋
      </h2>

      <div className="flex gap-4 items-center">
        <FiSearch />

        <span className="relative">
          <FiBell className="text-theme" />
          <span className="size-1 rounded-full bg-orange-400 absolute top-0 right-1" />
        </span>

        <span className="flex gap-2 items-center font-medium">
          <FiCalendar className="text-theme" />
          {getFormattedDate()}
        </span>

        {/* <Image
          src="/img/user.jpg"
          alt="Profile"
          width={34}
          height={34}
          className="ml-2.5 rounded-full object-cover transition-transform duration-300 hover:scale-105"
        /> */}

        <div className="flex relative">
          <img
            src={session?.user?.image || "/img/user.jpg"}
            className="size-9 ml-2.5 rounded-full object-cover transition-transform duration-300 hover:scale-105 "
            onClick={() => setToggleDropDown((prev: any) => !prev)}
          />
          {/* <Image
            src={session?.user?.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() => setToggleDropDown((prev: any) => !prev)}
          /> */}

          {toggleDropDown && (
            <div className="dropdown absolute bottom-0">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropDown(false)}
              >
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={() => setToggleDropDown(false)}
              >
                Create prompt
              </Link>
              <button
                type="button"
                className="mt-5 w-full black_btn"
                onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
