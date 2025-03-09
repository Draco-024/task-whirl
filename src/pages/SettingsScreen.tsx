
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTaskContext } from "@/context/TaskContext";
import Layout from "@/components/Layout";

const SettingsScreen = () => {
  const { shakeEnabled, toggleShakeEnabled, clearAllTasks, tasks } = useTaskContext();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <Layout title="Settings" showBackButton>
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Preferences</h2>
          
          <div className="bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium">Shake to Pick</h3>
                <p className="text-sm text-muted-foreground">
                  Shake your device to randomly pick a task
                </p>
              </div>
              <Switch 
                checked={shakeEnabled} 
                onCheckedChange={toggleShakeEnabled} 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Data</h2>
          
          <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                disabled={tasks.length === 0}
              >
                Clear All Tasks
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your tasks.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => {
                    clearAllTasks();
                    setIsConfirmOpen(false);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">About</h2>
          
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="font-medium">Task Jar</h3>
            <p className="text-sm text-muted-foreground mt-1">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground mt-4">
              A simple app to manage your tasks and randomly pick one to complete.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsScreen;
