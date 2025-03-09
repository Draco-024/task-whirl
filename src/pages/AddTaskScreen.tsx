
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
      <div className="max-w-md mx-auto mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="task-name" className="block text-lg font-medium">
              Task Name
            </label>
            <Input
              id="task-name"
              type="text"
              placeholder="Enter your task here..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
              className="w-full py-6 text-lg rounded-xl border-border/50 focus:border-taskjar focus:ring-taskjar"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-6 rounded-xl border-taskjar/30 hover:bg-taskjar/5 transition-all duration-300"
              onClick={() => navigate("/home")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 py-6 rounded-xl bg-gradient-to-r from-taskjar to-taskjar-dark hover:shadow-lg transition-all duration-300"
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
