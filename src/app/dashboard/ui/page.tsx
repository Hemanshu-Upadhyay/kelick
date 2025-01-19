"use client";

import { useState, useEffect, useMemo } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import EmployeeTable from "@/components/employee-table";
import StatsCards from "@/components/stats-card";
import LoaderSpinner from "@/components/loader-spinner";
import { useEmployees } from "@/hooks/useEmployee";
import { motion } from "framer-motion";
import { CustomSelect } from "@/components/ui/customSelect";
import dynamic from "next/dynamic";

const SuccessDialog: any = dynamic(() => import("@/components/dialog"), {
  ssr: false,
});
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const employees = useEmployees();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const statusOptions = useMemo(
    () =>
      // @ts-ignore
      [...new Set(employees?.map((employee) => employee.status))].map(
        (status) => ({ label: status, value: status })
      ),
    [employees]
  );

  const roleOptions = useMemo(
    () =>
      // @ts-ignore
      [...new Set(employees?.map((employee) => employee.role))].map((role) => ({
        label: role,
        value: role,
      })),
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        !selectedStatus || employee.status === selectedStatus;

      const matchesRole = !selectedRole || employee.role === selectedRole;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [employees, searchTerm, selectedStatus, selectedRole]);

  useEffect(() => {
    if (employees && employees.length > 0) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [employees]);

  useEffect(() => {
    if (!dialogOpen && !hasShownToast) {
      toast.success("Employees successfully added", {
        style: {
          border: "2px solid #E0E0E0",
          fontFamily: "Quicksand",
          fontSize: "18px",
          borderRadius: "8px",
          width: "285px",
          marginLeft: "50px",
          padding: "12px",
          font: "bold",
          background: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        },
        duration: 2000,
      });
      setHasShownToast(true);
    }
  }, [dialogOpen, hasShownToast]);

  const handleGeneratePayroll = () => {
    console.log("Generating payroll...");
    setDialogOpen(false);
  };

  if (!employees || employees.length < 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">No file uploaded</p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <motion.div
          className="flex min-h-screen"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <SuccessDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onGeneratePayroll={handleGeneratePayroll}
          />
          <Toaster position="bottom-center" duration={2000} />

          <main className="flex-1 p-8 min-h-screen">
            <motion.div
              className="flex justify-end"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </motion.div>

            <StatsCards />

            <div className="mt-8 space-y-4">
              <motion.div
                className="flex justify-between items-center w-full gap-4"
                variants={fadeIn}
              >
                <div className="flex gap-4 flex-1">
                  <h1 className="text-lg font-semibold">All Employees</h1>
                </div>
                <Input
                  placeholder="Search employee"
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CustomSelect
                  placeholder="All Status"
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={(value: any) => setSelectedStatus(value)}
                />

                <CustomSelect
                  placeholder="All Role"
                  options={roleOptions}
                  value={selectedRole}
                  onChange={(value: any) => setSelectedRole(value)}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <EmployeeTable data={filteredEmployees} />
              </motion.div>
            </div>
          </main>
        </motion.div>
      )}
    </>
  );
}
