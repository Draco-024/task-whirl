
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskContext } from "@/context/TaskContext";
import Layout from "@/components/Layout";

const AddTaskScreen = () => {
  const [taskName, setTaskName] = useState("");
  const { addTask } = useTaskContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName);
      navigate("/home");
    }
  };

  return (
    <Layout title="Add Task" showBackButton>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="task-name" className="block text-sm font-medium">
              Task Name
            </label>
            <Input
              id="task-name"
              type="text"
              placeholder="Enter your task here..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
              className="w-full"
            />
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/home")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-taskjar hover:bg-taskjar-dark"
              disabled={!taskName.trim()}
            >
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddTaskScreen;
