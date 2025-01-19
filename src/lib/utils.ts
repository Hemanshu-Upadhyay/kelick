import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

export const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "border-[#E2FFFD] text-[#02B9B0] bg-[#E2FFFD]";
    case "Invite Sent":
      return "border-[#8318E7] text-[#8318E7] bg-[#F2E5FF]";
    case "Payroll only":
      return "border-[#F1F5F9] text-[#5F6969] bg-[#F1F5F9]";
    default:
      return "border-gray-400 text-gray-400 bg-gray-50";
  }
};
