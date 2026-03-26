import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { patient } from "@/data/testdata";
import { FileImage, Home, User } from "lucide-react";

function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/beelden", label: "Beelden en verslagen", icon: FileImage },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-primary" role="banner">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-sm">PGO</span>
            </div>
            <span className="text-primary-foreground font-semibold text-lg hidden sm:inline">
              Mijn Gezondheid
            </span>
          </Link>

          <nav className="flex items-center gap-1" role="navigation" aria-label="Hoofdnavigatie">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-primary-foreground/80">
            <User className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm hidden md:inline">{patient.name}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-6 animate-fade-in" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-4" role="contentinfo">
        <div className="container text-center text-sm text-muted-foreground">
          Prototype Beeldbeschikbaarheid — Geen echte medische gegevens
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
