"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const SideBar = () => {
  const icons: string[] = [
    "menu",
    "user",
    "calender",
    "stats",
    "upload",
    "bookmark",
    "filter",
  ];

  const [active, setActive] = useState<number>(0);
  return (
    <div className="bg-[#1c1d22] min-h-screen px-3 shadow py-4 md:py-5 flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-6 mb-8 -mt-1 items-center">
          <Image
            src={"/img/ovals.png"}
            width={25}
            height={25}
            className="object-scale-down"
            alt="logo"
          />
          <Image
            src={"/img/Logo.png"}
            width={28}
            height={27}
            className="mt-4 object-scale-down"
            alt="logo"
          />
        </div>
        <div className="flex flex-col gap-4">
          {icons?.map((item: any, i: number) => (
            <button
              onClick={() => setActive(i)}
              className={` ${
                i == active &&
                "bg-[#333438] rounded-full grid place-items-center"
              } p-3`}
              key={i}
            >
              <Image
                src={`/img/${item}.png`}
                width={20}
                height={20}
                alt={item}
                className=" object-scale-down"
                priority
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      <button
        className={` hover:bg-[#333438] rounded-full grid place-items-center p-3 z-[99999]`}
        onClick={() => signOut()}
      >
        <Image
          src={"/img/sign-out.png"}
          width={20}
          height={20}
          className="size-5 mx-auto object-scale-down"
          alt="logo"
        />
      </button>
    </div>
  );
};

export default SideBar;
