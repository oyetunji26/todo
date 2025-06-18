"use client";

import React, {useState} from "react";
import ThemeToggle from "./ThemeToggle";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import DropDown from "../Ui/DropDown";
import AddBtn from "../Ui/AddBtn";
import Modal from "../Modal";
import CreateProjectForm from "./create";

type DropdownItem = {
  title: string;
  options: string[];
  opened: boolean;
};

const Projects = () => {
  const [open, setOpen] = useState(false);
  const dropdownData: DropdownItem[] = [
    {
      title: "Team",
      options: ["All members (12)", "Active (9)", "Pending (2)", "Removed (1)"],
      opened: false,
    },
    {
      title: "Projects",
      options: [
        "All projects (5)",
        "Ongoing (3)",
        "Completed (1)",
        "Archived (1)",
      ],
      opened: true,
    },
    {
      title: "Tasks",
      options: ["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"],
      opened: false,
    },
    {
      title: "Reminders",
      options: ["All reminders (7)", "Today (2)", "Upcoming (3)", "Past (2)"],
      opened: false,
    },
    {
      title: "Messages",
      options: ["All messages (18)", "Unread (5)", "Starred (4)"],
      opened: true,
    },
  ];

  return (
    <section className="bg-[#ffffff] dark:bg-[#222327] h-screen overflow-hidden md:min-w-[278px] section flex flex-col justify-between gap-2">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-theme text-3xl font-bold">Projects</h3>

          <AddBtn onClick={() => setOpen(true)} iconSize={12} />

          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <CreateProjectForm  onSuccess={() => setOpen(false)}/>
          </Modal>
        </div>

        <div className=" overflow-y-scroll max-h-[80vh]">
          {dropdownData.map((item: DropdownItem, i: number) => (
            <DropDown
              key={i}
              title={item?.title}
              options={item?.options}
              opened={item?.opened}
            />
          ))}
        </div>
      </div>

      <ThemeToggle />
    </section>
  );
};

export default Projects;
