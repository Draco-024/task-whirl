
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskJar from "@/components/TaskJar";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="flex flex-col items-center animate-scale-up">
        <TaskJar size="large" animate />
        <h1 className="mt-6 text-4xl font-bold text-primary">Task Jar</h1>
        <p className="mt-2 text-muted-foreground">Your daily tasks, one pick away.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
