"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DropDown from "../Ui/DropDown";
import AddBtn from "../Ui/AddBtn";
import CreateProjectForm from "./CreateProject";
import { useTasks, useUserProjects } from "@/hooks";
import { useProjectStore, useModalStore } from "@/store";
import { useTaskFilterStore } from "@/store/useTaskFilterStore";

type DropdownOption = {
  label: string;
  value: string;
  count?: number;
  onClick: () => void;
};

type DropdownItem = {
  title: string;
  options: DropdownOption[];
  opened: boolean;
};

const Projects = () => {
  const { openModal, closeModal } = useModalStore();
  const { data: project, isLoading, error, isSuccess } = useUserProjects();
  const { setSelectedFilter } = useTaskFilterStore();

  // { project: projectId }

  const { projects, activeProject, setActiveProject, setProjects } =
    useProjectStore();

  // const { data: tasks, isLoading: isTaskLoading } = useTasks({
  //   project: activeProject?._id || "",
  // });

  useEffect(() => {
    if (isSuccess) {
      setProjects(project);
      console.log("set project to global state", project);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log("projects", projects);
  }, [projects]);

  const dropdownData: DropdownItem[] = [
    {
      title: "Tasks",
      options: [
        {
          label: "All Tasks",
          value: "all",
          onClick: () => setSelectedFilter("all"),
        },
        {
          label: "To Do",
          value: "todo",
          onClick: () => setSelectedFilter("todo"),
        },
        {
          label: "In Progress",
          value: "in_progress",
          onClick: () => setSelectedFilter("in_progress"),
        },
        {
          label: "Done",
          value: "done",
          onClick: () => setSelectedFilter("done"),
        },
      ],
      opened: true,
    },
    {
      title: "Reminders",
      options: [
        {
          label: "All reminders",
          value: "all_reminders",
          count: 7,
          onClick: () => console.log("Show: All reminders"),
        },
        {
          label: "Today",
          value: "today",
          count: 2,
          onClick: () => console.log("Show: Today’s reminders"),
        },
        {
          label: "Upcoming",
          value: "upcoming",
          count: 3,
          onClick: () => console.log("Show: Upcoming reminders"),
        },
        {
          label: "Past",
          value: "past",
          count: 2,
          onClick: () => console.log("Show: Past reminders"),
        },
      ],
      opened: false,
    },
    {
      title: "Messages",
      options: [
        {
          label: "All messages",
          value: "all_messages",
          count: 18,
          onClick: () => console.log("Show: All messages"),
        },
        {
          label: "Unread",
          value: "unread",
          count: 5,
          onClick: () => console.log("Show: Unread messages"),
        },
        {
          label: "Starred",
          value: "starred",
          count: 4,
          onClick: () => console.log("Show: Starred messages"),
        },
      ],
      opened: false,
    },
  ];

  const handleSelect = (project: any) => {
    setActiveProject(project);
    console.log("Active Project:", project);
  };

  return (
    <section className="bg-[#ffffff] dark:bg-[#222327] h-screen overflow-hidden md:min-w-[278px] section flex flex-col justify-between gap-2">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-theme text-3xl font-bold">Projects</h3>

          <AddBtn
            onClick={() =>
              openModal(<CreateProjectForm onSuccess={() => closeModal()} />)
            }
            iconSize={12}
          />

          {/* <Modal isOpen={open} onClose={() => setOpen(false)}>
            <CreateProjectForm  onSuccess={() => setOpen(false)}/>
          </Modal> */}
        </div>

        <p className="text-theme">{/* {projects[0]?.title} t */}</p>

        <div className=" overflow-y-scroll max-h-[80vh]">
          <DropDown
            title="Projects"
            options={projects}
            opened={false}
            defaultOption
            onSelect={handleSelect}
          />

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
