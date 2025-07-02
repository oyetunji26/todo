"use client";
import { useTasks } from "@/hooks";
import React, {useEffect, useState} from "react";
import TaskComponent from "./Task";

const TaskList = ({  } : any) => {
    const [taskList, setTaskList] = useState<any | null>([])
  return (
    <div className="grid gap-2">
        {tasks?.map((item: any, i: number) => (
            <TaskComponent key={i} item={item} />
        ))}
    </div>
  );
};

export default TaskList;
