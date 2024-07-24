"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Task {
  id: number;
  title: string;
  description: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function handleDelete() {
    setDeleting(true);
    try {
      await axios.delete("/api/tasks");
      setTasks([]);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
      <h2 className="text-xl font-semibold">My Tasks</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length <= 0 ? (
        <p>No tasks available. Try to add new one</p>
      ) : (
        <>
          <div className="flex flex-col gap-2 my-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-row items-center justify-between rounded-lg border py-2 px-4"
              >
                <div className="space-y-0.5 ">
                  <div className="text-base font-medium">{task.title}</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {task.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive" disabled={deleting}>
                {deleting ? "Deleting..." : "Delete All Tasks"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
