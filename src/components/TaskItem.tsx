
import { useState } from "react";
import { Task, useTaskContext } from "@/context/TaskContext";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask } = useTaskContext();
  const [translateX, setTranslateX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    if (diff < 0) {
      // Only allow swiping left (negative values)
      setTranslateX(Math.max(diff, -100));
    }
  };

  const handleTouchEnd = () => {
    if (translateX < -50) {
      // If swiped more than 50px, delete
      setIsDeleting(true);
      setTimeout(() => deleteTask(task.id), 300);
    } else {
      // Otherwise, reset position
      setTranslateX(0);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => deleteTask(task.id), 300);
  };

  return (
    <div 
      className={cn(
        "bg-card rounded-lg shadow-sm mb-2 overflow-hidden transition-all duration-300 relative",
        isDeleting && "opacity-0 scale-95"
      )}
    >
      <div 
        className="flex items-center p-4 relative"
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1">
          <p className="font-medium">{task.name}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-muted-foreground hover:text-destructive transition-colors duration-200"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div 
        className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-gradient-to-r from-destructive/80 to-destructive text-destructive-foreground px-4 transition-opacity duration-300"
        style={{ 
          opacity: translateX < 0 ? Math.min(Math.abs(translateX) / 50, 1) : 0,
          width: '80px'
        }}
      >
        <Trash2 className="h-5 w-5" />
      </div>
    </div>
  );
};

export default TaskItem;
