"use client";
import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useToast } from "./ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

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
  const [updating, setUpdating] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        variant: "destructive",
        description: "Failed to fetch tasks. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAll() {
    setDeleting(true);
    try {
      await axios.delete("/api/tasks");
      setTasks([]);
      toast({
        description: "All tasks deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting tasks:", error);
      toast({
        variant: "destructive",
        description: "Failed to delete tasks. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  }

  async function handleDeleteById(id: string) {
    setDeleting(true);
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== parseInt(id)));
      toast({
        description: response.data.message,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        variant: "destructive",
        description: "Failed to delete task. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  }

  async function handleUpdate(updatedTask: Task) {
    setUpdating(true);
    try {
      const response = await axios.patch(
        `/api/tasks/${updatedTask.id}`,
        updatedTask
      );
      setEditingTask(null);
      toast({
        description: "Task updated successfully.",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        variant: "destructive",
        description: "Failed to update task. Please try again.",
      });
    } finally {
      setUpdating(false);
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
            {tasks &&
              tasks.map((task) => (
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
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <FaTrash
                          className="cursor-pointer"
                          size={18}
                          color="crimson"
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
                            onClick={() => handleDeleteById(task.id.toString())}
                            className="bg-red-400 hover:bg-red-500"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <FaEdit
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setEditingTask(task)}
                        />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Task</DialogTitle>
                          <DialogDescription>
                            Make changes to your Task here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (editingTask) handleUpdate(editingTask);
                          }}
                        >
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-start gap-4">
                              <Label htmlFor="title" className="text-left">
                                Title
                              </Label>
                              <Input
                                id="title"
                                value={editingTask?.title || ""}
                                onChange={(e) =>
                                  setEditingTask((prev) =>
                                    prev
                                      ? { ...prev, title: e.target.value }
                                      : null
                                  )
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                              <Label
                                htmlFor="description"
                                className="text-left"
                              >
                                Description
                              </Label>
                              <Textarea
                                id="description"
                                value={editingTask?.description || ""}
                                onChange={(e) =>
                                  setEditingTask((prev) =>
                                    prev
                                      ? { ...prev, description: e.target.value }
                                      : null
                                  )
                                }
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">
                              {updating ? "Saving..." : "Save changes"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
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
