"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUploadDialog } from "@/components/file-upload-dialog";
import Image from "next/image";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex   border-[#B3BEBE] bg-gray-50">
      <main className="flex-1 p-8">
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="w-48 h-48 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/icons/Search-1.svg"
                  alt="Start building your team"
                  width={48}
                  height={48}
                  className="w-full h-full"
                />
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Start building your team
              </h2>
              <p className="text-gray-500 mb-8">
                Add your first team member or import your entire team.
              </p>
              <div className="flex gap-4">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="gap-2"
                  >
                    <img src="/icons/upload.svg" className="h-4 w-4" />
                    Bulk Upload
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-[#02B9B0] hover:bg-[#02B9B0]/90 gap-2"
                  >
                    <img src="/icons/addEmployee.svg" className="h-4 w-4" />
                    Add Employee
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        <FileUploadDialog open={open} onOpenChange={setOpen} />
      </main>
    </div>
  );
}
