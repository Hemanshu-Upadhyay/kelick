"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatDetail, Stat } from "../../types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("uploadedData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const employeeData = parsedData[0]?.data || [];

      const nationalityStats: Stat = {
        title: "Nationality",
        total: String(employeeData.length),
        subtitle: "Employees",
        details: [
          {
            label: "Singaporean",
            value: employeeData.filter(
              (e: any) => e.Nationality === "Singaporean"
            ).length,
            color: "#02B9B0",
          },
          {
            label: "PR",
            value: employeeData.filter((e: any) => e.Nationality === "PR")
              .length,
            color: "#FAC905",
          },
          {
            label: "Foreigner",
            value: employeeData.filter(
              (e: any) => e.Nationality === "Foreigner"
            ).length,
            color: "#B774FC",
          },
          {
            label: "Others",
            value: employeeData.filter((e: any) => e.Nationality === "Others")
              .length,
            color: "#B3BEBE",
          },
        ],
      };

      const employmentStats: Stat = {
        title: "Employment Type",
        total: String(employeeData.length),
        subtitle: "Employees",
        details: [
          {
            label: "Full-Timer",
            value: employeeData.filter(
              (e: any) => e.EmploymentType === "Full-timer"
            ).length,
            color: "#02B9B0",
          },
          {
            label: "Part-Timer",
            value: employeeData.filter(
              (e: any) => e.EmploymentType === "Part-timer"
            ).length,
            color: "#FFB800",
          },
          {
            label: "Contract",
            value: employeeData.filter(
              (e: any) => e.EmploymentType === "Contract"
            ).length,
            color: "#B774FC",
          },
          {
            label: "Intern",
            value: employeeData.filter(
              (e: any) => e.EmploymentType === "Intern"
            ).length,
            color: "#B3BEBE",
          },
        ],
      };

      const employeeStatusStats: Stat = {
        title: "Employee Status",
        total: String(employeeData.length),
        subtitle: "Employees",
        details: [
          {
            label: "Active",
            value: employeeData.filter(
              (e: any) => e.EmploymentStatus === "Active"
            ).length,
            color: "#02B9B0",
          },
          {
            label: "Invite Sent",
            value: employeeData.filter(
              (e: any) => e.EmploymentStatus === "Invite Sent"
            ).length,
            color: "#B774FC",
          },
          {
            label: "Payroll Only",
            value: employeeData.filter(
              (e: any) => e.EmploymentStatus === "Payroll only"
            ).length,
            color: "#B3BEBE",
          },
        ],
      };

      setStats([nationalityStats, employmentStats, employeeStatusStats]);
    }
  }, []);

  const calculateCircumference = (radius: number) => 2 * Math.PI * radius;

  const calculateArcValues = (
    value: number,
    total: number,
    radius: number,
    previousPercentage: number = 0
  ) => {
    const circumference = calculateCircumference(radius);
    const percentage = (value / total) * 100;
    const arcLength = (circumference * percentage) / 100;
    const dashArray = `${arcLength} ${circumference - arcLength}`;
    const dashOffset = -(circumference * previousPercentage) / 100;

    return { dashArray, dashOffset, percentage };
  };

  const calculateHalfDoughnutValues = (
    value: number,
    total: number,
    radius: number,
    previousPercentage: number = 0
  ) => {
    const circumference = calculateCircumference(radius);
    const halfCircumference = circumference / 2;
    const percentage = (value / total) * 100;
    const arcLength = (halfCircumference * percentage) / 100;
    const dashArray = `${arcLength} ${halfCircumference - arcLength}`;
    const dashOffset = -(halfCircumference * previousPercentage) / 100;

    return { dashArray, dashOffset, percentage };
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full px-4 py-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 w-full"
          variants={cardVariants}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[#5F6969] text-sm font-normal mb-2">
                  {stat.title}
                </h3>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#2E3333] mb-0.5">
                    {stat.total}
                  </span>
                  <span className="text-l text-[#2E3333] font-bold">
                    {stat.subtitle}
                  </span>
                </div>
              </div>

              {index !== 1 && (
                <div className="relative w-24 h-24">
                  <svg
                    viewBox="0 0 36 36"
                    style={{
                      transform:
                        index === 2 ? "rotate(180deg)" : "rotate(-90deg)",
                    }}
                  >
                    {stat.details.map((detail, i) => {
                      const total = stat.details.reduce(
                        (sum, d) => sum + d.value,
                        0
                      );
                      const previousPercentage = stat.details
                        .slice(0, i)
                        .reduce(
                          (acc, curr) => acc + (curr.value / total) * 100,
                          0
                        );

                      const { dashArray, dashOffset } =
                        index === 2
                          ? calculateHalfDoughnutValues(
                              detail.value,
                              total,
                              15.915,
                              previousPercentage
                            )
                          : calculateArcValues(
                              detail.value,
                              total,
                              15.915,
                              previousPercentage
                            );

                      return (
                        <motion.circle
                          key={detail.label}
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke={detail.color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={dashArray}
                          strokeDashoffset={dashOffset}
                          style={{
                            transformOrigin: "50% 50%",
                          }}
                          initial={{
                            strokeDashoffset:
                              index === 2
                                ? calculateCircumference(15.915) / 2
                                : calculateCircumference(15.915),
                          }}
                          animate={{ strokeDashoffset: dashOffset }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                        />
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>

            {index === 1 && (
              <div className="mb-6 w-full">
                <div className="h-2 w-full rounded-full overflow-hidden flex bg-gray-100">
                  {stat.details.map((detail, i) => {
                    const total = stat.details.reduce(
                      (sum, d) => sum + d.value,
                      0
                    );
                    const width = (detail.value / total) * 100;

                    return (
                      <motion.div
                        key={detail.label}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                        style={{
                          width: `${width}%`,
                          backgroundColor: detail.color,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Legend section */}
            {index === 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                {stat.details.map((detail) => (
                  <div key={detail.label} className="flex items-center">
                    <div
                      className="h-3 w-1 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: detail.color }}
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      <span className="font-bold mr-1">{detail.value}</span>
                      {detail.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                {stat.details.map((detail) => (
                  <div key={detail.label} className="flex items-center">
                    <div
                      className="h-3 w-1 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: detail.color }}
                    />
                    <span className="text-sm text-gray-600">
                      <span className="font-bold">{detail.value}</span>
                      &nbsp;
                      {detail.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsCards;
