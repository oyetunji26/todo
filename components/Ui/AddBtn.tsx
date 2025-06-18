import React from "react";
import { FaPlus } from "react-icons/fa";

type AddBtnProps = {
  title?: string;
  onClick: () => void;
  iconSize?: number;
  classes?: string;
}

const AddBtn: React.FC<AddBtnProps> = ({title = '', iconSize = 10, classes='',  onClick}) => {
  return (
    <button className={`flex-center gap-1.5 text-theme-inactive ${classes} `} onClick={onClick}>
      <span className="bg-[#EDEDED] dark:bg-[#343538]  p-1.5 grid place-items-center rounded-full">
        <FaPlus className="" size={iconSize} />
      </span>{" "}
      {title}
    </button>
  );
};

export default AddBtn;
