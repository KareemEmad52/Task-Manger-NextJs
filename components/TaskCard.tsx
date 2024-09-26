"use client";
import { Button } from "./ui/button";
import { X, ChevronDown, ChevronUp, CheckCircle2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { format } from "date-fns";
import { Task, TaskFormData } from "@/lib/types";
import { DeleteTask, updateTask } from "@/lib/actions";
import { useAuth } from "@/store/AuthContext";
import { toast as reactToastify } from "react-toastify";
import { useToast } from "@/hooks/use-toast";
import { ClipLoader } from "react-spinners";

export const TaskCard = ({ task }: { task: Task }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
  const { isAuth } = useAuth()
  const { toast } = useToast()


  const toggleExpanded = (taskId: number) => {
    setExpandedTasks((prevExpandedTasks) =>
      prevExpandedTasks.includes(taskId)
        ? prevExpandedTasks.filter((id) => id !== taskId)
        : [...prevExpandedTasks, taskId]
    );
  };

  const handleTaskStatusChange = async (taskId: number, newStatus: 'in-progress' | 'completed') => {
    setIsLoading(true);
    try {
      const response = await updateTask(taskId as unknown as string, { status: newStatus }, isAuth.token);

      if (response.success) {
        toast({
          description: "Status updated successfully ✅",
        })
      } else {
        console.log(response.error);
        reactToastify.error(response.error || "Unknown error occurred.", {
          autoClose: 2000
        })
      }
    } catch (error) {
      reactToastify.error(error instanceof Error ? error.message : "Unknown error", {
        autoClose: 2000
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    const id = reactToastify.loading("Please wait...")
    try {
      const response = await DeleteTask(taskId as unknown as string, isAuth.token);

      if (response.success) {
        reactToastify.dismiss(id);
        toast({
          description: "Deleted successfully",
        })
      } else {
        console.log(response.error);
        reactToastify.error(response.error || "Unknown error occurred.", {
          autoClose: 2000
        })
      }
    } catch (error) {
      reactToastify.error(error instanceof Error ? error.message : "Unknown error", {
        autoClose: 2000
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`bg-card text-card-foreground rounded-lg shadow-md p-4 relative overflow-hidden`}
    >
      <Button variant="ghost" size="icon" onClick={()=>handleDeleteTask(task._id)} className="absolute top-2 right-2">
        <X className="h-4 w-4" />
        <span className="sr-only">Delete task</span>
      </Button>
      <div className="flex items-center mb-2">
        <h2 className="text-lg font-semibold mr-2">{task.title}</h2>
        {task.status === "completed" ?
          <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge> : <Badge variant="secondary">In-Progress</Badge>
        }

      </div>

      <p className="text-muted-foreground">
        {expandedTasks.includes(task._id)
          ? task.description
          : `${task.description.slice(0, 100)}${task.description.length > 100 ? "..." : ""
          }`}
      </p>
      <div className="flex items-center mt-3 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Deadline: {format(new Date(task.deadline), "PP")}</span>
      </div>
      {task.description.length > 100 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={() => toggleExpanded(task._id)}
        >
          {expandedTasks.includes(task._id) ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show More
            </>
          )}
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        className={`mt-2 ml-2`}
        onClick={() =>
          handleTaskStatusChange(task._id, task.status === "in-progress" ? "completed" : "in-progress")
        }
      >
        {isLoading ? (
          <>
            <ClipLoader size={15} className="mr-3 " color="white" />
            Loading...
          </>
        ) : task.status === "in-progress" ? (
          "Mark as Completed"
        ) : (
          "Mark as In Progress"
        )}
      </Button>

    </div>
  );
};
