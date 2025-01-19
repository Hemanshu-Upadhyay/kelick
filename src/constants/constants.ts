import { NavItem } from "../../types";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const MANAGE_NAV_ITEMS: NavItem[] = [
  { href: "/", icon: "/icons/employees.svg", label: "Employees" },
  { href: "/payroll", icon: "/icons/payroll.svg", label: "Payroll" },
  { href: "/leaves", icon: "/icons/leaves.svg", label: "Leaves" },
  { href: "/claims", icon: "/icons/claims.png", label: "Claims" },
];

export const TABLE_HEADERS = [
  { label: "Employee ID", sortable: true },
  { label: "Employee Profile", sortable: true },
  { label: "Email", sortable: true },
  { label: "Role", sortable: true },
  { label: "Status", sortable: true },
];

export const statusVariants = {
  success: {
    icon: CheckCircle2,
    color: "text-green-500",
    message: "File uploaded successfully!",
  },
  error: {
    icon: AlertCircle,
    color: "text-red-500",
    message: "Something went wrong. Please try again.",
  },
};
