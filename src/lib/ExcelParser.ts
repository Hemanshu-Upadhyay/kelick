import * as XLSX from "xlsx";

interface ParsedSheet {
  sheetName: string;
  data: Record<string, any>[];
}

interface ParserResult {
  success: boolean;
  data?: ParsedSheet[];
  error?: string;
}

const expectedColumns = [
  "EmployeeID",
  "Nationality",
  "EmploymentType",
  "EmploymentStatus",
  "EmployeeProfile",
  "EmployeeEmail",
  "Role",
];

const validEmploymentTypes = ["Full-timer", "Part-timer", "Contract", "Intern"];
const validEmploymentStatuses = ["Active", "Invite Sent", "Payroll only"];

export const parseExcelFile = async (file: File): Promise<ParserResult> => {
  try {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            throw new Error("No data found in file");
          }

          const workbook = XLSX.read(data, { type: "binary" });
          const parsedData: ParsedSheet[] = [];

          workbook.SheetNames.forEach((sheetName) => {
            const sheetData = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName]
            );

            const sheetColumns = Object.keys(sheetData[0] || {});
            const missingColumns = expectedColumns.filter(
              (col) => !sheetColumns.includes(col)
            );

            if (missingColumns.length > 0) {
              throw new Error(
                `Missing required columns: ${missingColumns.join(", ")}`
              );
            }

            for (const row of sheetData) {
              // @ts-ignore
              if (!validEmploymentTypes.includes(row["EmploymentType"])) {
                throw new Error(
                  // @ts-ignore
                  `Invalid EmploymentType: ${row["EmploymentType"]}`
                );
              }
              // @ts-ignore
              if (!validEmploymentStatuses.includes(row["EmploymentStatus"])) {
                throw new Error(
                  // @ts-ignore
                  `Invalid EmploymentStatus: ${row["EmploymentStatus"]}`
                );
              }
            }
            // @ts-ignore
            parsedData.push({ sheetName, data: sheetData });
          });

          if (parsedData.length === 0) {
            throw new Error("No valid data found in sheets");
          }

          localStorage.setItem("uploadedData", JSON.stringify(parsedData));

          resolve({ success: true, data: parsedData });
        } catch (error) {
          resolve({
            success: false,
            error:
              error instanceof Error ? error.message : "Failed to parse file",
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Failed to read file",
        });
      };

      reader.readAsBinaryString(file);
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process file",
    };
  }
};
