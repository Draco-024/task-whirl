
import { useMemo } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { cn } from "@/lib/utils";

interface TaskJarProps {
  onClick?: () => void;
  animate?: boolean;
  size?: "small" | "medium" | "large";
}

const TaskJar = ({ onClick, animate = false, size = "medium" }: TaskJarProps) => {
  const { tasks } = useTaskContext();

  const jarSize = useMemo(() => {
    switch (size) {
      case "small":
        return "w-24 h-28";
      case "large":
        return "w-48 h-56";
      case "medium":
      default:
        return "w-36 h-44";
    }
  }, [size]);

  const fillLevel = useMemo(() => {
    if (tasks.length === 0) return "h-0";
    const percentage = Math.min(Math.max(tasks.length * 5, 10), 75);
    return `h-[${percentage}%]`;
  }, [tasks.length]);

  return (
    <div 
      className={cn(
        "relative cursor-pointer transition-transform", 
        jarSize,
        animate && "animate-float",
        onClick && "hover:scale-110 active:scale-95"
      )}
      onClick={onClick}
    >
      {/* Outer glow effect */}
      <div className="absolute inset-0 blur-md rounded-2xl bg-taskjar-light/30 transform scale-105"></div>
      
      {/* Glass effect for jar */}
      <div className="absolute inset-0 rounded-b-2xl rounded-t-lg border-2 border-white/30 bg-white/10 backdrop-blur-lg overflow-hidden shadow-lg">
        {/* Highlight reflection */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[150%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-30 transform skew-x-12 pointer-events-none"></div>
        </div>
        
        {/* Task papers with gradient */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-b from-taskjar-light/90 to-taskjar/90 transition-all duration-500",
            fillLevel
          )}
        >
          {tasks.length > 0 && (
            <div className="absolute inset-0">
              {Array.from({ length: Math.min(tasks.length * 2, 25) }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-white/90 rounded-sm shadow-sm p-1"
                  style={{
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 15 + 5}px`,
                    left: `${Math.random() * 80 + 10}%`,
                    bottom: `${Math.random() * 80 + 10}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40 pointer-events-none"></div>
        
        {/* Jar lid with shine effect */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-[90%] h-4 bg-gradient-to-r from-taskjar-dark/90 via-taskjar to-taskjar-dark/90 rounded-t-lg z-10 border border-white/20">
          <div className="absolute top-1 left-1/4 w-1/2 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>
      
      {/* Jar label */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-taskjar-dark shadow-sm border border-taskjar-light/50">
        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
      </div>
    </div>
  );
};

export default TaskJar;
