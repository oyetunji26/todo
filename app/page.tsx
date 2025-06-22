"use client";

import Projects from "@/components/projects";
import { FaPlus } from "react-icons/fa";
import TopBar from "@/components/TopBar";
import MenuBar from "@/components/MenuBar";
import { FiMoreHorizontal } from "react-icons/fi";
import AddBtn from "@/components/Ui/AddBtn";
import MoreBtn from "@/components/Ui/MoreBtn";
import ProgressBar from "@/components/Ui/ProgressBar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/utils/getCurrentUser";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); 
      // or signIn() to show next-auth page
    }

    getCurrentUser();
  }, [status, router]);

  return (
    <div className="flex items-center justify-between">
      <SideBar />
      <main className="grow flex min-h-screen  items-center justify-between bg-white">
        <Projects />
        <div className="bg-[#f5f5f5] shadow-inner dark:bg-[#2A2B2F] grow h-screen  py-4 md:py-5 px-7">
          <TopBar />

          <MenuBar />

          <div className="grid grid-cols-3 pt-5 text-theme">
            <div className="flex flex-col gap-3 border border-dashed dark:border-0 rounded-lg bg-[#FFFFFF] dark:bg-[#24262c] p-2">
              <div className="flex-between mt-3 text-sm">
                <h3>To do</h3>
                <AddBtn title="Add new task" iconSize={10} onClick={() => {}} />
              </div>

              <div className="border flex flex-col gap-2 rounded-lg dark:border-0 dark:bg-[#292b31] p-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base text-theme">
                      Design new ui presentation
                    </h3>
                    <p className="text-sm text-theme-inactive">
                      Dribble marketing
                    </p>
                  </div>

                  <MoreBtn />
                </div>

                <ProgressBar value={67} />

                <div className="flex-between"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
