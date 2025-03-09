
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
}

const Layout = ({
  children,
  title,
  showBackButton = false,
  showSettingsButton = false,
}: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === "/picked-task") {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      {(title || showBackButton || showSettingsButton) && (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30">
          <div className="container flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="rounded-full hover:bg-secondary/80 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              {title && <h1 className="text-xl font-semibold">{title}</h1>}
            </div>
            {showSettingsButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSettings}
                className="rounded-full hover:bg-secondary/80 transition-colors duration-200"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>
      )}
      <main className="flex-1 container py-6">{children}</main>
    </div>
  );
};

export default Layout;
