"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { parseExcelFile } from "@/lib/ExcelParser";
import { FileUploaderProps } from "../../types";
import { statusVariants } from "@/constants/constants";

const fadeInOut = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function FileUploader({
  onUpload,
  className,
  redirectPath = "/dashboard",
}: FileUploaderProps) {
  const router = useRouter();
  const [isDragging, setIsDragging] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const simulateProgress = () => {
    setProgress(0);
    setStatus("uploading");

    return new Promise<void>((resolve) => {
      const duration = 2000;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newProgress = Math.min((currentStep / steps) * 100, 95);
        setProgress(newProgress);

        if (currentStep >= steps) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  };

  const handleSuccess = async () => {
    setProgress(100);
    setStatus("success");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(redirectPath);
  };

  const handleError = (message: string) => {
    setStatus("error");
    setErrorMessage(message);
    setProgress(0);

    setTimeout(() => {
      // Reset the status to idle after a delay, ensuring the user can retry
      setStatus("idle");
      setErrorMessage("");
      fileInputRef.current!.value = ""; // Clear the file input to allow retry
    }, 3000);
  };

  const handleFile = async (file: File) => {
    try {
      await simulateProgress();

      const result = await parseExcelFile(file);

      if (!result.success) {
        throw new Error(result.error);
      }

      if (onUpload) {
        await onUpload(file);
      }

      await handleSuccess();
    } catch (error) {
      handleError(
        error instanceof Error ? error.message : "Failed to process file"
      );
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative rounded-lg border border-dashed border-gray-300 bg-white p-8 transition-colors",
          isDragging ? "border-[#02B9B0] bg-[#02B9B0]/5" : "border-gray-300",
          status === "uploading" ? "pointer-events-none" : "cursor-pointer"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx,.csv"
          className="hidden"
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <AnimatePresence mode="wait">
            {status === "uploading" && (
              <motion.div
                key="uploading"
                className="w-full space-y-4"
                {...fadeInOut}
              >
                <Progress
                  value={progress}
                  className="w-full max-w-[280px] mx-auto rounded-lg"
                  // @ts-ignore
                  indicatorclassName="bg-[#02B9B0] transition-all duration-300 ease-in-out"
                />
                <motion.p
                  className="text-xs font-medium text-[#5F6969] text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Please wait while we upload your file...
                </motion.p>
              </motion.div>
            )}

            {(status === "success" || status === "error") && (
              <motion.div
                key="status"
                className="flex flex-col items-center space-y-2"
                {...fadeInOut}
              >
                {React.createElement(statusVariants[status].icon, {
                  className: cn("w-8 h-8", statusVariants[status].color),
                })}
                <motion.p
                  className={cn(
                    "text-sm font-medium text-center",
                    status === "error" ? "text-red-500" : "text-green-500"
                  )}
                >
                  {status === "error"
                    ? errorMessage
                    : statusVariants.success.message}
                </motion.p>
              </motion.div>
            )}

            {status === "idle" && (
              <motion.div
                key="idle"
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div initial={{ y: 0 }} exit={{ y: -20, opacity: 0 }}>
                  <img src="/icons/uploadfile.svg" alt="Upload" />
                </motion.div>
                <motion.p
                  className="text-sm font-medium text-[#5F6969] text-center"
                  initial={{ y: 0 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  Drag and drop your files here
                  <br />
                  or{" "}
                  <span className="underline text-[15px] text-muted-foreground font-semibold italic underline-offset-4 decoration-1">
                    click to upload
                  </span>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
