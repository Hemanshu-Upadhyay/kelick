"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, ChevronDown, Bell, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem, SidebarProps } from "../../types";
import { MANAGE_NAV_ITEMS } from "@/constants/constants";

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-2 px-3 text-xs tracking-tight text-gray-500">{title}</h2>
);

export function Sidebar({ className, onNavigate, ...props }: SidebarProps) {
  const NavLink = ({ href, icon, label }: NavItem) => {
    const pathname = usePathname();

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
          pathname === href && " bg-[#F2F5F5] text-[#1A1A1A]  "
        )}
        onClick={(e) => {
          if (onNavigate) {
            onNavigate();
          }
        }}
      >
        <motion.img
          src={icon}
          alt={icon}
          className="fonth-4 w-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        <span>{label}</span>
      </Link>
    );
  };
  const [isOrganizationOpen, setIsOrganizationOpen] = React.useState(true);

  const sidebarAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const childAnimation = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // @ts-ignore
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarAnimation}
      className={cn(
        "flex flex-col h-screen w-full sm:w-[300px] md:w-[300px] lg:w-[275px] xl:w-[300px] border-r bg-white sticky top-0",
        className
      )}
      {...props}
    >
      <div className="flex flex-col h-full ">
        <div className="flex-grow overflow-y-auto space-y-4 py-4">
          <motion.div className="px-4 py-2" variants={childAnimation}>
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="flex h-10 w-10">
                <motion.img
                  src="/icons/Group.svg"
                  alt="Kelick"
                  className="h-full w-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
              </span>
              <h1 className="text-xl text-[#2E3333]  tracking-tight">kelick</h1>
            </Link>
          </motion.div>

          <motion.div className="px-3" variants={childAnimation}>
            <NavLink
              href="/dashboard"
              icon="/icons/home.svg"
              label="Dashboard"
            />
          </motion.div>

          <motion.div className="px-3 py-2" variants={childAnimation}>
            <SectionHeader title="ORGANIZATION" />
            <motion.button
              onClick={() => setIsOrganizationOpen(!isOrganizationOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <motion.img
                  src="/icons/organisation.svg"
                  alt="Organization"
                  className="h-4 w-4"
                  whileHover={{ scale: 1.1 }}
                />
                <span className="text-md font-Quicksand font-medium">
                  Kelick
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOrganizationOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.button>
          </motion.div>

          <motion.div className="px-3 py-2" variants={childAnimation}>
            <SectionHeader title="MANAGE" />
            <div className="space-y-1">
              <AnimatePresence>
                {MANAGE_NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    <NavLink {...item} />
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.98 }}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="text-md font-Quicksand font-medium">More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex-shrink-0 mt-auto space-y-4 px-3 pb-4"
          variants={childAnimation}
        >
          <motion.div
            className="rounded-lg border px-3 py-2"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="items-center gap-3">
              <Package className="h-4 mb-2 w-4 text-gray-500" />
              <span className="text-md font-medium">Free Plan</span>
            </div>
            <div className="mt-1">
              <div className="text-xs text-gray-500">1/10 Employees</div>
              <motion.div
                className="mt-1 h-1 w-full rounded-full bg-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="h-full w-[10%] rounded-full bg-[#02B9B0]"
                  initial={{ width: "0%" }}
                  animate={{ width: "10%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            whileHover={{ x: 2 }}
          >
            <Bell className="h-4 w-4 text-gray-500" />
            <span className="text-md font-medium">Notifications</span>
            <motion.span
              className="ml-auto h-2 w-2 rounded-full bg-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            whileHover={{ x: 2 }}
          >
            <motion.div
              className="h-8 w-8 rounded-full bg-gray-200"
              whileHover={{ scale: 1.1 }}
            />
            <div className="flex flex-col">
              <span className="text-md font-Quicksand font-medium">
                John Doe
              </span>
              <span className="text-xs text-gray-500">johndoe@asure.pro</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
