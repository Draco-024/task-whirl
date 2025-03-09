
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Task, useTaskContext } from "@/context/TaskContext";
import Layout from "@/components/Layout";
import Confetti from "@/components/Confetti";

const PickedTaskScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickRandomTask } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // If we don't have a task in the location state, pick one randomly
    if (location.state?.task) {
      setTask(location.state.task);
      setShowConfetti(true);
    } else {
      const randomTask = pickRandomTask();
      if (randomTask) {
        setTask(randomTask);
        setShowConfetti(true);
      } else {
        navigate("/home");
      }
    }
  }, [location.state, navigate, pickRandomTask]);

  const handlePickAnother = () => {
    const randomTask = pickRandomTask();
    if (randomTask) {
      setTask(randomTask);
      setShowConfetti(true);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <Layout showBackButton>
      {showConfetti && <Confetti />}
      
      <div className="flex flex-col items-center justify-center h-[70vh] max-w-md mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-xl font-medium text-muted-foreground">Your task for today:</h2>
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-md animate-scale-up">
            <h1 className="text-3xl font-bold text-primary">{task.name}</h1>
          </div>
          
          <div className="pt-6 space-y-4">
            <Button 
              onClick={handlePickAnother}
              variant="outline"
              className="w-full"
            >
              Pick Another
            </Button>
            
            <Button 
              onClick={() => navigate("/home")}
              className="w-full bg-taskjar hover:bg-taskjar-dark"
            >
              Back to Tasks
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PickedTaskScreen;
