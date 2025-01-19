"use client";

import { useEffect, useState } from "react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("uploadedData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const employeeData = parsedData[0]?.data || [];

      const transformedData = employeeData.map((employee: any) => ({
        id: employee.EmployeeID,
        name: employee.EmployeeProfile,
        email: employee.EmployeeEmail,
        role: employee.Role,
        status: employee.EmploymentStatus,
      }));

      setEmployees(transformedData);
    }
  }, []);

  return employees;
};
