"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUploader } from "./file-uploadert";
import { motion, AnimatePresence } from "framer-motion";
import { FileUploadDialogProps } from "../../types";

export function FileUploadDialog({
  open,
  onOpenChange,
}: FileUploadDialogProps) {
  const handleDownload = () => {
    console.log("Downloading example XLSX");
  };

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence mode="wait">
        {open && (
          <DialogContent
            className="max-w-md p-0 gap-0"
            // @ts-ignore
            as={motion.div}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={itemVariants}>
                <DialogHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <DialogTitle>Upload File</DialogTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-500 hover:text-gray-700"
                      onClick={() => onOpenChange(false)}
                    ></Button>
                  </div>
                </DialogHeader>
              </motion.div>

              <motion.div
                className="p-4 space-y-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <FileUploader
                    onUpload={async (file) => {
                      console.log(`Uploading file: ${file.name}`);
                    }}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between text-xs text-[#5F6969]"
                >
                  <span>Supported formats: XLS, CSV</span>
                  <span>Maximum file size: 25MB</span>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 flex items-center justify-center">
                        <img
                          src="/icons/Excel.svg"
                          className="h-8 w-8 text-[#1D6F42]"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm">Table Example</h3>
                        <p className="text-xs font-extralight text-[#5F6969]">
                          You can download the attached example and
                          <br />
                          use them as a starting point for your own file.
                        </p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <a href="/employees_example.csv" download>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={handleDownload}
                        >
                          <img src="/icons/download.svg" className="h-4 w-4" />
                          <span>Download XLSX</span>
                        </Button>
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-end gap-2 border-t p-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Button
                    onClick={() => onOpenChange(false)}
                    className="bg-[#02B9B0] hover:bg-[#02B9B0]/90"
                  >
                    Continue
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
