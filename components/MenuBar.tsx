"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineViewAgenda } from "react-icons/md";
import AddBtn from "./Ui/AddBtn";
import { useModalStore, useProjectStore } from "@/store";
import CreateTaskForm from "./projects/CreateTask";

const MenuBar = () => {
  const [active, setActive] = useState<number>(1);
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [isSort, setIsSort] = useState<boolean>(false);

  const { openModal, closeModal } = useModalStore();
  const { activeProject } = useProjectStore();

  return (
    <div className="flex items-center justify-between mt-10 pb-4 border-b-[2px] border-theme ">
      <div className="flex gap-6">
        <button
          className={`flex-center gap-1.5 ${
            active == 0 ? "text-theme  border-theme" : "text-theme-inactive"
          }`}
          onClick={() => {
            setActive(0);
          }}
        >
          <MdOutlineViewAgenda /> Board View
        </button>

        <AddBtn
          title="Add new"
          classes={`${
            active == 1 ? "text-theme  border-theme" : "text-theme-inactive"
          }`}
          onClick={() =>
            activeProject
              ? openModal(
                  <CreateTaskForm
                    project={activeProject}
                    onSuccess={() => closeModal()}
                  />
                )
              : openModal(<CreateTaskForm onSuccess={() => closeModal()} />)
          }
        />

        {/* <button
          className={`flex-center gap-1.5 ${
            active == 1
              ? "text-theme border-b-2 border-theme"
              : "text-theme-inactive"
          }`}
          onClick={() => setActive(1)}
        >
          <span className="bg-[#EDEDED] dark:bg-[#343538]  p-1.5 grid place-items-center rounded-full">
            <FaPlus className="" size={10} />
          </span>{" "}
          Add new
        </button> */}
      </div>

      <div className="flex gap-3 ">
        <button
          onClick={() => setIsFilter(!isSort)}
          className={`text-sm ${
            isFilter ? "text-theme font-medium" : "text-theme-inactive"
          }`}
        >
          filter
        </button>

        <button
          onClick={() => setIsSort(!isSort)}
          className={`text-sm ${
            isSort ? "text-theme font-medium" : "text-theme-inactive"
          }`}
        >
          sort
        </button>
        <button className="bg-[#1c1d22] dark:bg-[#4b69ff] px-3 py-1.5 font-semibold !text-[14px] rounded-full">
          New template
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
