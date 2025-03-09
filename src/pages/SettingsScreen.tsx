
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
      <div className="max-w-md mx-auto space-y-10 mt-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Preferences</h2>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between p-5">
              <div>
                <h3 className="font-medium text-lg">Shake to Pick</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Shake your device to randomly pick a task
                </p>
              </div>
              <Switch 
                checked={shakeEnabled} 
                onCheckedChange={toggleShakeEnabled}
                className="data-[state=checked]:bg-taskjar"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data</h2>
          
          <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 p-5 rounded-xl"
                disabled={tasks.length === 0}
              >
                Clear All Tasks
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card/95 backdrop-blur-md border border-border/50 rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your tasks.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => {
                    clearAllTasks();
                    setIsConfirmOpen(false);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About</h2>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="font-medium text-lg">Task Jar</h3>
            <p className="text-sm text-muted-foreground mt-1">Version 1.0.0</p>
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                A simple app to manage your tasks and randomly pick one to complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsScreen;
