"use client";

import Projects from "@/components/projects";
import { FaPlus } from "react-icons/fa";
import TopBar from "@/components/TopBar";
import MenuBar from "@/components/MenuBar";
import { FiMoreHorizontal } from "react-icons/fi";
import AddBtn from "@/components/Ui/AddBtn";
import MoreBtn from "@/components/Ui/MoreBtn";
import ProgressBar from "@/components/Ui/ProgressBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import { useAuthStore, useProjectStore } from "@/store";
import Loader from "@/components/Ui/Loader";
import ProjectList from "@/components/projects/ProjectList";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilterStore } from "@/store/useTaskFilterStore";

export default function Home() {
  const { user, isLoggedIn } = useAuthStore();
  const { projects, activeProject, setActiveProject } = useProjectStore();
  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useTasks({ project: activeProject?._id || "" });

  const { selectedFilter } = useTaskFilterStore();

  // const [selectedFilter, setSelectedFilter] = useState<
  //   "all" | "todo" | "in_progress" | "done"
  // >("all");

  const todoTasks = tasks?.filter((task) => task?.status === "todo");
  const inProgressTasks = tasks?.filter(
    (task) => task?.status === "in_progress"
  );
  const doneTasks = tasks?.filter((task) => task?.status === "done");

  const getFilteredTasks = () => {
    if (selectedFilter === "todo")
      return [{ name: `To do (${todoTasks?.length})`, item: todoTasks }];
    if (selectedFilter === "in_progress")
      return [
        {
          name: `In Progress (${inProgressTasks?.length})`,
          item: inProgressTasks,
        },
      ];
    if (selectedFilter === "done")
      return [{ name: `Done (${doneTasks?.length})`, item: doneTasks }];
    // If 'all', return all
    return [
      { name: `To do (${todoTasks?.length})`, item: todoTasks },
      {
        name: `In Progress (${inProgressTasks?.length})`,
        item: inProgressTasks,
      },
      { name: `Done (${doneTasks?.length})`, item: doneTasks },
    ];
  };

  const router = useRouter();

  // useEffect(() => {
  console.log("user details", user);
  // }, [user])

  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // Wait a moment to let SessionHydrator populate Zustand
    const timer = setTimeout(() => {
      setCheckedAuth(true);
    }, 200); // Slight delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (checkedAuth && !isLoggedIn) {
      router.push("/auth");
    }
  }, [checkedAuth, isLoggedIn]);

  if (!checkedAuth || !isLoggedIn) return <Loader />;

  return (
    <div className="flex items-center justify-between overflow-hidden">
      <SideBar />
      <main className="grow flex min-h-screen  items-center justify-between bg-white">
        <Projects />
        <div className="bg-[#f5f5f5] flex flex-col shadow-inner mx-auto dark:bg-[#2A2B2F] grow h-screen  py-4 md:py-5 px-7">
          <TopBar />

          <MenuBar />
          <div
            // className="space-y-3 py-3 sm:columns-2 sm:gap-2 md:columns-4">
            className="grid grid-cols-3 gap-3 pt-5 text-theme grow overflow-hidden"
          >
            {getFilteredTasks().map((group) => (
              <ProjectList
                key={group.name}
                name={group.name}
                items={group.item}
              />
            ))}

          </div>
        </div>
      </main>
    </div>
  );
}
