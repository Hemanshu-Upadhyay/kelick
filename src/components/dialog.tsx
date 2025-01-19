"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import confettiAnimation from "@/animations/end-screen-lottie.json";
import { SuccessDialogProps } from "../../types";
import { cn } from "@/lib/utils";

export default function SuccessDialog({
  open,
  onOpenChange,
  onGeneratePayroll,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-4 sm:p-12 md:p-12 lg:p-16",
          "w-[95vw] max-w-lg mx-auto",
          "h-auto min-h-[300px]"
        )}
      >
        <div className="relative w-full h-full">
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              "w-full sm:w-96 h-full sm:h-96"
            )}
          >
            <Lottie
              animationData={confettiAnimation}
              loop={true}
              style={{
                position: "absolute",
                width: "250%",
                height: "250%",
                top: "-65%",
                left: "-75%",
                transform: "scale(0.8) sm:scale(1)",
              }}
            />
          </div>

          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 relative z-10">
            <div className="rounded-full border-2 border-[#02B9B0] p-1.5 sm:p-2">
              <div className="rounded-full bg-[#02B9B0] p-1.5 sm:p-2">
                <Check className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-4">
              <h2
                className={cn(
                  "font-semibold",
                  "text-lg sm:text-xl md:text-2xl",
                  "leading-tight",
                  "px-2 sm:px-4"
                )}
              >
                Congrats! You've successfully added all your employees!
              </h2>
              <p
                className={cn(
                  "text-gray-600",
                  "text-sm sm:text-base",
                  "px-2 sm:px-0"
                )}
              >
                Would you like to generate payroll?
              </p>
            </div>

            <div
              className={cn(
                "w-full mt-4 sm:mt-6",
                "flex flex-col sm:flex-row",
                "gap-3 sm:gap-4",
                "px-2 sm:px-0"
              )}
            >
              <Button
                variant="outline"
                className={cn(
                  "flex-1",
                  "h-10 sm:h-11",
                  "text-sm sm:text-base",
                  "px-4 sm:px-6"
                )}
                onClick={() => onOpenChange(false)}
              >
                I'll do it later
              </Button>
              <Button
                className={cn(
                  "flex-1",
                  "h-10 sm:h-11",
                  "text-sm sm:text-base",
                  "px-4 sm:px-6",
                  "leading-4 bg-[#02B9B0] hover:bg-[#02B9B0]/90"
                )}
                onClick={onGeneratePayroll}
              >
                Generate Payroll
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
