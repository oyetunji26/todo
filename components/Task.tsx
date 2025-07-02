import React from "react";
import MoreBtn from "./Ui/MoreBtn";
import ProgressBar from "./Ui/ProgressBar";
import { formatDateToShortReadable } from "@/utils/formatDate";

const TaskComponent = ({ item }: any) => {
  return (
    <div className="border flex flex-col gap-2 rounded-lg dark:border-0 dark:bg-[#292b31] p-2.5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base text-theme">{item?.title}</h3>
          <p className="text-sm text-theme-inactive">{item?.description}</p>
        </div>
        <MoreBtn />
      </div>
      <ProgressBar value={item?.progress} />
      <div className="flex-between text-theme ">
        <div className="bg-[#35373c] rounded-xl p-1.5 !text-[10px] ">
          {formatDateToShortReadable(item?.dueDate)}
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
