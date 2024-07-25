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
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useToast } from "./ui/use-toast";

interface Task {
  id: number;
  title: string;
  description: string;
}

export function TaskList() {
  const { toast } = useToast();
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

  async function handleDeleteAll() {
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

  async function handleDeleteById(id: string) {
    setDeleting(true);
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      toast({
        description: response.data.message,
      });
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
                <div className="flex gap-2">
                  <div>
                    {/*  */}

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <FaTrash
                          className="cursor-pointer"
                          size={18}
                          color="crimson"
                          onClick={() => {
                            console.log("clicked");
                          }}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure to delete this task?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your task.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeleteById(task.id.toString());
                            }}
                            className="bg-red-400 hover:bg-red-500"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div>
                    <FaEdit size={18} className="cursor-pointer" />
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
                  your task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAll}
                  className="bg-red-400 hover:bg-red-500"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
