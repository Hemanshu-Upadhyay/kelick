export interface NavItem {
  href: string;
  icon: string;
  label: string;
}

export interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onNavigate?: () => void;
}
export interface MobileSidebarProps {
  className?: string;
  breakpoint?: "sm" | "md" | "lg";
}

export interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGeneratePayroll: () => void;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface EmployeeTableProps {
  data: Employee[];
  selectable?: boolean;
  initialSelected?: Set<string>;
}

export interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface FileUploaderProps {
  onUpload?: (file: File) => Promise<void>;
  className?: string;
  redirectPath?: string;
}

export interface StatDetail {
  label: string;
  value: number;
  color: string;
}

export interface Stat {
  title: string;
  total: string;
  subtitle: string;
  details: StatDetail[];
}
