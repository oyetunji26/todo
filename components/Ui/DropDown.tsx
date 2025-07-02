"use client";
import React, { useState } from "react";
import { HiMiniChevronDown, HiMiniChevronRight } from "react-icons/hi2";

type DropdownProps = {
  title: string;
  opened?: boolean;
  options: string[] | any;
  disabled?: boolean;
  onSelect?: (project: any) => void;
  defaultOption?: boolean;
};

const DropDown = ({
  title,
  options,
  opened = false,
  disabled = false,
  onSelect,
  defaultOption,
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(opened);
  const [active, setActive] = useState<number>(0);

  console.log(options);

  //   const options: string[] = ;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex items-center justify-between cursor-pointer  ${
          open ? "text-theme" : "text-theme-inactive"
        }`}
      >
        <h3 className={`capitalize text-base font-bold `}>{title}</h3>
        <button
          onClick={() => setOpen(!open)}
          className=" p-2 hover:bg-blend-darken"
          disabled={disabled}
        >
          {open ? (
            <HiMiniChevronDown size={23} />
          ) : (
            <HiMiniChevronRight size={23} />
          )}
        </button>
      </div>

      {open && (
      <div className="border-l-2 border-theme flex flex-col gap-2 py-1.5">
        {defaultOption && (
          <div className="flex items-center gap-2">
            <hr className="w-3 border border-theme" />
            <button
              onClick={() => {
                setActive(0);
                onSelect?.(null);
              }}
              className={` px-4 py-1 flex gap-10 !text-[14px] font-medium ${
                active == 0
                  ? "bg-[#f6f6f6] dark:bg-[#2b2c30] text-theme rounded-full font-semibold"
                  : "text-theme-inactive"
              }`}
            >
              All {title}
            </button>
          </div>
        )}

        {options?.map((item: any, i: number) => (
          <div
            key={defaultOption ? i + 1 : i}
            className="flex items-center gap-2"
          >
            <hr className="w-3 border border-theme" />
            <button
              onClick={() => {
                setActive(defaultOption ? i + 1 : i);
                onSelect?.(item);
                item?.onClick?.();
              }}
              className={`px-4 py-1 flex gap-10 !text-[14px] font-medium ${
                (defaultOption ? i + 1 === active : i === active)
                  ? "bg-[#f6f6f6] dark:bg-[#2b2c30] text-theme rounded-full font-semibold"
                  : "text-theme-inactive"
              }`}
            >
              {item?.title || item?.label}
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default DropDown;
