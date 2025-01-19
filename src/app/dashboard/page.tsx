import React from "react";
import DashboardPage from "./ui/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage Employee Data",
};

const page = () => {
  return <DashboardPage />;
};

export default page;
