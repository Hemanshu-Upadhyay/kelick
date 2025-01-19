import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EmployeeTableProps } from "../../types";
import { getInitials, getStatusStyles } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { TABLE_HEADERS } from "@/constants/constants";

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  initialSelected = new Set<string>(),
}) => {
  const [selectedEmployees, setSelectedEmployees] =
    useState<Set<string>>(initialSelected);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(new Set(data.map((employee) => employee.id)));
      setSelectAll(true);
    } else {
      setSelectedEmployees(new Set());
      setSelectAll(false);
    }
  };

  const handleSelectEmployee = (id: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(id)) {
      newSelected.delete(id);
      setSelectAll(false);
    } else {
      newSelected.add(id);
      if (newSelected.size === data.length) {
        setSelectAll(true);
      }
    }
    setSelectedEmployees(newSelected);
  };

  return (
    <>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">No employees Data.</p>
        </div>
      ) : (
        <div className="rounded-lg border shadow-md overflow-hidden">
          <Table className=" min-w-full">
            <TableHeader>
              <TableRow className="bg-[#F9FCFC] border-b border-gray-300">
                <TableHead className="w-12 p-4 text-center">
                  <input
                    type="checkbox"
                    aria-label="Select all employees"
                    className="rounded border-gray-300 text-[#02B9B0]"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </TableHead>
                {TABLE_HEADERS.map((header, index) => (
                  <TableHead key={index} className="p-4 text-center">
                    <div className="flex  gap-2">
                      {header.label}
                      {header.sortable && (
                        <ChevronsUpDown className="w-4 h-4  text-gray-500" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <TableCell className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#02B9B0]"
                      checked={selectedEmployees.has(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                    />
                  </TableCell>
                  <TableCell className="p-4 font-medium text-[#02B9B0] underline">
                    #{employee.id}
                  </TableCell>
                  <TableCell className="p-4 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={employee.name} />
                      <AvatarFallback>
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{employee.name}</span>
                  </TableCell>
                  <TableCell className="p-4 font-semibold">
                    {employee.email}
                  </TableCell>
                  <TableCell className="p-4 font-semibold">
                    {employee.role}
                  </TableCell>
                  <TableCell className="p-4">
                    <Badge
                      style={{
                        backgroundColor:
                          employee.status === "Active"
                            ? "#E2FFFD"
                            : employee.status === "Invite Sent"
                            ? "#F2E5FF"
                            : "#F1F5F9",
                      }}
                      variant="outline"
                      className={cn(
                        "rounded-xl px-3 py-1 text-sm",
                        getStatusStyles(employee.status)
                      )}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
