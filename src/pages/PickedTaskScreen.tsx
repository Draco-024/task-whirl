
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
        <div className="text-center space-y-8 w-full">
          <h2 className="text-xl font-medium text-muted-foreground">Your task for today:</h2>
          
          <div className="bg-gradient-to-br from-card to-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl p-10 shadow-lg animate-scale-up">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-taskjar-dark to-taskjar bg-clip-text text-transparent">{task.name}</h1>
          </div>
          
          <div className="pt-8 space-y-4 w-full">
            <Button 
              onClick={handlePickAnother}
              variant="outline"
              className="w-full py-6 rounded-xl border-taskjar/30 hover:bg-taskjar/5 transition-all duration-300"
            >
              Pick Another
            </Button>
            
            <Button 
              onClick={() => navigate("/home")}
              className="w-full py-6 rounded-xl bg-gradient-to-r from-taskjar to-taskjar-dark hover:shadow-lg transition-all duration-300"
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
