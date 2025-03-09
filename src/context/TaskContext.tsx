
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  name: string;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string) => void;
  deleteTask: (id: string) => void;
  clearAllTasks: () => void;
  pickRandomTask: () => Task | null;
  shakeEnabled: boolean;
  toggleShakeEnabled: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [shakeEnabled, setShakeEnabled] = useState(true);
  const { toast } = useToast();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedShakeEnabled = localStorage.getItem("shakeEnabled");
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedShakeEnabled !== null) {
      setShakeEnabled(JSON.parse(savedShakeEnabled));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save shake preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shakeEnabled", JSON.stringify(shakeEnabled));
  }, [shakeEnabled]);

  const addTask = (name: string) => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Task name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your jar",
    });
  };

  const clearAllTasks = () => {
    setTasks([]);
    toast({
      title: "All tasks cleared",
      description: "Your task jar is now empty",
    });
  };

  const pickRandomTask = (): Task | null => {
    if (tasks.length === 0) {
      toast({
        title: "No tasks available",
        description: "Add some tasks to your jar first",
        variant: "destructive",
      });
      return null;
    }

    const randomIndex = Math.floor(Math.random() * tasks.length);
    return tasks[randomIndex];
  };

  const toggleShakeEnabled = () => {
    setShakeEnabled((prev) => !prev);
    toast({
      title: `Shake to pick ${!shakeEnabled ? "enabled" : "disabled"}`,
      description: `You can ${!shakeEnabled ? "now" : "no longer"} shake your device to pick a task`,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        clearAllTasks,
        pickRandomTask,
        shakeEnabled,
        toggleShakeEnabled,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
