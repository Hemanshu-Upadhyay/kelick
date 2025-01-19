"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { MobileSidebarProps } from "../../types";

export function MobileSidebar({
  className,
  breakpoint = "md",
}: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const breakpointMap = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
  };

  const isBreakpoint = useMediaQuery(
    `(min-width: ${breakpointMap[breakpoint]})`
  );

  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      setError(null);
    }
  }, [open]);

  React.useEffect(() => {
    const handleNavigationComplete = () => {
      setOpen(false);
    };

    window.addEventListener("popstate", handleNavigationComplete);
    return () => {
      window.removeEventListener("popstate", handleNavigationComplete);
    };
  }, []);

  const handleOpenChange = async (newOpen: boolean) => {
    try {
      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      setOpen(newOpen);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle sidebar");
    } finally {
      setIsLoading(false);
    }
  };

  const SidebarWithNavigation = () => {
    const handleNavigation = () => {
      setOpen(false);
    };

    return <Sidebar onNavigate={handleNavigation} />;
  };

  if (isBreakpoint) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            `${breakpoint}:hidden`,
            "relative",
            "hover:bg-gray-100 transition-colors duration-200",
            isLoading && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={isLoading}
          onClick={() => handleOpenChange(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className={cn(
          "p-0 w-[90vw] sm:w-[300px]",
          "border-r shadow-lg",
          "bg-white",
          "min-h-screen"
        )}
        ref={contentRef}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {error ? (
            <div className="p-4 text-red-500 text-sm">{error}</div>
          ) : (
            <SidebarWithNavigation />
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
