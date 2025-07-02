import React from "react";
import AddBtn from "../Ui/AddBtn";
import TaskList from "../TaskList";
import { useModalStore, useProjectStore } from "@/store";
import CreateTaskForm from "./CreateTask";
import { useTasks } from "@/hooks/useTasks";
import TaskComponent from "../Task";

const ProjectList = ({ name, items, hidden }: any) => {
  const { openModal, closeModal } = useModalStore();
  const { activeProject } = useProjectStore();
  return (
    <div
      className={`
        ${hidden ? "hidden" : ""} 
        overflow-scroll h-fit
     relative flex-1 break-inside-avoid border-gray-200 cursor-pointer w-full hover:shadow-lg dark:border-none
    flex flex-col gap-3 border border-dashed dark:border-0 rounded-lg bg-[#6d3939] dark:bg-[#24262c] p-2`}
    >
      <div className="flex-between mt-3 text-sm">
        <h3 className="text-theme dark:text-[#ffffff80]">{name}</h3>
        <AddBtn
          title="Add new task"
          iconSize={10}
          onClick={() =>
            openModal(
              <CreateTaskForm project={items} onSuccess={() => closeModal()} />
            )
          }
        />
      </div>

      <div className="grid gap-2">
        {items?.map((item: any, i: number) => (
          <TaskComponent key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
