import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

// Exporting core components
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;
export const SheetOverlay = SheetPrimitive.Overlay;

export function SheetContent({ className, side = "right", children, ...props }) {
  const baseClasses =
    "fixed z-50 bg-white shadow-lg transition ease-in-out";

  const sideClasses = {
    left: "inset-y-0 left-0 w-[280px]",
    right: "inset-y-0 right-0 w-[280px]",
    top: "inset-x-0 top-0 h-[300px]",
    bottom: "inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl",
  };

  return (
    <SheetPortal>
      <SheetOverlay className="fixed inset-0 bg-black/40 z-40" />
      <SheetPrimitive.Content
        className={cn(baseClasses, sideClasses[side], className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

export const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

export const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-gray-900", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
