import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home,
  Users,
  BookOpen,
  Plus,
  LogIn,
  LogOut
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { currentUser, signOut } = useAuth();

  const routes = [
    { 
      title: "Dashboard", 
      href: "/", 
      icon: <Home className="h-5 w-5 mr-3" /> 
    },
    { 
      title: "Students", 
      href: "/students", 
      icon: <Users className="h-5 w-5 mr-3" /> 
    },
    { 
      title: "Add Student", 
      href: "/add-student", 
      icon: <Plus className="h-5 w-5 mr-3" />,
      requiresAuth: true
    }
  ];

  const authRoutes = currentUser
    ? [
        {
          title: "Sign Out",
          href: "#",
          icon: <LogOut className="h-5 w-5 mr-3" />,
          onClick: () => signOut(),
        },
      ]
    : [
        {
          title: "Sign In",
          href: "/login",
          icon: <LogIn className="h-5 w-5 mr-3" />,
        },
      ];

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 bg-white">
          <SidebarContent routes={routes} authRoutes={authRoutes} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar - fixed width */}
      <aside className="hidden md:block md:w-64 border-r bg-white shadow-sm z-10">
        <SidebarContent routes={routes} authRoutes={authRoutes} />
      </aside>
    </>
  );
};

interface SidebarContentProps {
  routes: Array<{
    title: string;
    href: string;
    icon: React.ReactNode;
    requiresAuth?: boolean;
    onClick?: () => void;
  }>;
  authRoutes: Array<{
    title: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }>;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ routes, authRoutes }) => {
  const { currentUser } = useAuth();

  return (
    <div className="h-full flex flex-col pt-5">
      <div className="px-3 py-2">
        <h2 className="text-2xl font-bold text-student-primary mb-2 px-4">
        StudentOps
        </h2>
        <p className="text-sm text-gray-500 mb-8 px-4">Student Management</p>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {routes.map((route) => {
            // Skip routes that require auth when user is not logged in
            if (route.requiresAuth && !currentUser) {
              return null;
            }
            
            return (
              <Button
                key={route.href}
                asChild
                variant="ghost"
                className="w-full justify-start py-2 h-10 text-base"
                onClick={route.onClick}
              >
                <NavLink
                  to={route.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center",
                      isActive
                        ? "bg-student-accent/20 text-student-primary font-medium"
                        : "text-gray-600 hover:text-student-primary hover:bg-student-accent/10"
                    )
                  }
                >
                  {route.icon}
                  {route.title}
                </NavLink>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t mt-auto">
        <div className="px-3 py-4">
          {authRoutes.map((route) => (
            <Button
              key={route.title}
              asChild={!route.onClick}
              variant="ghost"
              className="w-full justify-start py-2 h-10 text-base mb-1"
              onClick={route.onClick}
            >
              {route.onClick ? (
                <span className="flex items-center text-gray-600 hover:text-student-primary hover:bg-student-accent/10">
                  {route.icon}
                  {route.title}
                </span>
              ) : (
                <NavLink
                  to={route.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center",
                      isActive
                        ? "bg-student-accent/20 text-student-primary font-medium"
                        : "text-gray-600 hover:text-student-primary hover:bg-student-accent/10"
                    )
                  }
                >
                  {route.icon}
                  {route.title}
                </NavLink>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
