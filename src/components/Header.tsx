"use client";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { HeaderProps } from "../../types";
import { FileUploadDialog } from "@/components/file-upload-dialog";
import { useState } from "react";

export function Header({ title, children, className }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";

  return (
    <header
      className={`sticky top-0 z-40 flex h-20  items-center justify-between border-b bg-[#FFFFFF] px-4 md:px-6 ${className}`}
      role="banner"
    >
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="text-xl font-semibold text-black">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {isDashboard && (
          <Button
            onClick={() => setOpen(true)}
            className="bg-[#02B9B0] hover:bg-[#02B9B0]/90"
          >
            <UsersRound className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        )}
        {children}
      </div>
      <FileUploadDialog open={open} onOpenChange={setOpen} />
    </header>
  );
}
