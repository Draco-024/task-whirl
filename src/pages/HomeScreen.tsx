
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/TaskContext";
import { useShakeDetection } from "@/hooks/useShakeDetection";
import Layout from "@/components/Layout";
import TaskItem from "@/components/TaskItem";
import TaskJar from "@/components/TaskJar";
import { useToast } from "@/hooks/use-toast";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { tasks, pickRandomTask, shakeEnabled } = useTaskContext();
  const { toast } = useToast();
  const [isShaking, setIsShaking] = useState(false);

  const handlePickTask = () => {
    const randomTask = pickRandomTask();
    if (randomTask) {
      navigate("/picked-task", { state: { task: randomTask } });
    }
  };

  const handleShake = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    const jar = document.getElementById("task-jar");
    if (jar) {
      jar.classList.add("animate-shake");
      setTimeout(() => {
        jar.classList.remove("animate-shake");
        handlePickTask();
      }, 500);
    } else {
      handlePickTask();
    }
    
    setTimeout(() => setIsShaking(false), 1000);
  };

  useShakeDetection(shakeEnabled, handleShake);

  useEffect(() => {
    if (shakeEnabled) {
      toast({
        title: "Shake to pick",
        description: "Shake your device to randomly pick a task",
      });
    }
  }, []);

  return (
    <Layout title="Task Jar" showSettingsButton>
      <div className="flex flex-col items-center space-y-6">
        <div id="task-jar" className="my-4 transition-transform hover:scale-105">
          <TaskJar onClick={handlePickTask} animate />
        </div>

        <Button 
          onClick={handlePickTask} 
          className="bg-taskjar hover:bg-taskjar-dark w-full max-w-md transition-all duration-300 hover:shadow-lg"
          disabled={tasks.length === 0}
        >
          Pick a Task
        </Button>

        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Tasks</h2>
            <span className="text-muted-foreground text-sm px-2 py-1 bg-secondary rounded-full">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-secondary/50 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">Your task jar is empty.</p>
              <p className="text-muted-foreground text-sm mt-2">Add some tasks to get started!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 rounded-lg">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-taskjar hover:bg-taskjar-dark transition-transform hover:scale-110"
        onClick={() => navigate("/add-task")}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </Layout>
  );
};

export default HomeScreen;
