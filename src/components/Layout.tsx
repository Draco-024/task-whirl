
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
    <div className="min-h-screen flex flex-col">
      {(title || showBackButton || showSettingsButton) && (
        <header className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="container flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              {title && <h1 className="text-xl font-semibold">{title}</h1>}
            </div>
            {showSettingsButton && (
              <Button variant="ghost" size="icon" onClick={handleSettings}>
                <Settings className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>
      )}
      <main className="flex-1 container py-4">{children}</main>
    </div>
  );
};

export default Layout;
