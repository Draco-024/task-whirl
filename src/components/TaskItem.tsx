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

  return (
    <div 
      className={cn(
        "bg-card rounded-lg shadow-sm mb-2 overflow-hidden transition-all duration-300",
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
          className="text-muted-foreground hover:text-destructive"
          onClick={() => {
            setIsDeleting(true);
            setTimeout(() => deleteTask(task.id), 300);
          }}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex items-center bg-destructive text-white px-4">
        <Trash2 className="h-5 w-5" />
      </div>
    </div>
  );
};

export default TaskItem;
