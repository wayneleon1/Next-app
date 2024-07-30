'use client';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useToast } from './ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import BeatLoader from 'react-spinners/BeatLoader';
import ClipLoader from 'react-spinners/ClipLoader';

interface Task {
  id: number;
  title: string;
  description: string;
}

// Function to  Fetch All tasks
async function fetchTasks() {
  try {
    const response = await axios.get('/api/tasks');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Function to delete All Tasks
async function handleDeleteAll() {
  try {
    const response = await axios.delete('/api/tasks');
    return response.data.message;
  } catch (error) {
    console.error('Error deleting tasks:', error);
  }
}

// Function to delete Task by Id
async function handleDeleteById(id: string) {
  try {
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data.message;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Function to update Task by Id
async function handleUpdate(updatedTask: Task) {
  try {
    const response = await axios.patch(
      `/api/tasks/${updatedTask.id}`,
      updatedTask
    );
    return response.data.message;
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

export function TaskList() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Query for Handling  fetch all tasks
  const {
    data: tasks,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ['Tasks'],
    queryFn: fetchTasks,
  });

  // Mutation for Handling  delete all tasks
  const { isPending: deleting, mutate: deleteAllMutation } = useMutation({
    mutationFn: handleDeleteAll,
    onSuccess: data => {
      toast({
        description: data,
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Mutation for Handling delete task by Id
  const { isPending: isDeleting, mutate: deleteByIdMutation } = useMutation({
    mutationFn: handleDeleteById,
    onSuccess: data => {
      toast({
        description: data,
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Mutation for Handling update task
  const { isPending: updating, mutate: updateTaskMutation } = useMutation({
    mutationFn: handleUpdate,
    onSuccess: data => {
      toast({
        description: data,
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (error) {
    toast({
      variant: 'destructive',
      description: 'Failed to fetch tasks. Please try again.',
    });
  }

  return (
    <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg">
      <h2 className="text-xl font-semibold">My Tasks</h2>
      {loading ? (
        <div className="flex items-center">
          <p>Loading tasks</p>
          <BeatLoader size={8} />
        </div>
      ) : tasks.length <= 0 ? (
        <p>No tasks available. Try to add new one</p>
      ) : (
        <>
          <div className="flex flex-col gap-2 my-4">
            {tasks &&
              tasks.map((task: Task) => (
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
                            onClick={() =>
                              deleteByIdMutation(task.id.toString())
                            }
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
                          onSubmit={e => {
                            e.preventDefault();
                            if (editingTask) updateTaskMutation(editingTask);
                          }}
                        >
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-start gap-4">
                              <Label htmlFor="title" className="text-left">
                                Title
                              </Label>
                              <Input
                                id="title"
                                value={editingTask?.title || ''}
                                onChange={e =>
                                  setEditingTask(prev =>
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
                                value={editingTask?.description || ''}
                                onChange={e =>
                                  setEditingTask(prev =>
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
                              {updating ? (
                                <div className="flex items-center gap-2">
                                  <p>Saving</p>
                                  <ClipLoader size={14} color="white" />
                                </div>
                              ) : (
                                'Save changes'
                              )}
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
                {deleting ? (
                  <p className="flex items-center gap-1">
                    <span>Deleting</span>
                    <ClipLoader size={14} color="white" />
                  </p>
                ) : (
                  'Delete All Tasks'
                )}
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
                  onClick={() => {
                    deleteAllMutation();
                  }}
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
