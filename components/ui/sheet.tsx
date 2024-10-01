"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChatState } from "@/context/chat-provider";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

```
/**
 * A component that renders a portal for Sheet content.
 * @param {Object} props - The props for the SheetPortal component.
 * @param {string} [props.className] - Additional CSS class names to apply to the portal.
 * @param {...SheetPrimitive.DialogPortalProps} props - Any additional props for the DialogPortal component.
 * @returns {React.ReactElement} A Sheet portal component.
 */
```
const SheetPortal = ({
  className,
  /**
   * Creates an overlay component using SheetPrimitive.Overlay with customizable className and props
   * @param {Object} props - The properties passed to the component
   * @param {string} [props.className] - Additional CSS class names to apply to the overlay
   * @param {React.Ref} ref - Ref object to be forwarded to the underlying SheetPrimitive.Overlay component
   * @returns {React.ReactElement} A SheetPrimitive.Overlay component with applied styles and animations
   */
  ...props
}: SheetPrimitive.DialogPortalProps) => (
  <SheetPrimitive.Portal className={cn(className)} {...props} />
);
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          /**
           * Renders a sheet component with customizable side, className, and additional props.
           * @param {Object} props - The component props.
           * @param {string} [props.side="right"] - The side of the screen where the sheet appears.
           * @param {string} [props.className] - Additional CSS class names for styling.
           * @param {React.ReactNode} props.children - The content to be rendered inside the sheet.
           * @param {React.Ref} ref - The ref object for the sheet content.
           * @returns {React.ReactElement} A SheetPortal component containing the sheet content.
           */
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/**
 * Renders a sheet header component with customizable styling
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props to be spread on the div element, including className and any other HTML attributes
 * @returns {JSX.Element} A div element with applied classes and props
 */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    /**
     * Renders a footer component for a sheet with responsive layout
     * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component, including className and any other HTML div attributes
     * @returns {JSX.Element} A div element with responsive flex layout for footer content
     */
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
/**
 * A React component that renders a title for a sheet using SheetPrimitive.Title
 * @param {Object} props - The props object
 * @param {string} [props.className] - Additional CSS classes to apply to the title
 * @param {React.Ref} ref - A ref to be forwarded to the underlying SheetPrimitive.Title component
 * @returns {React.ReactElement} A SheetPrimitive.Title component with applied styling and forwarded props
 */
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
/**
 * A React component that renders a description for a sheet using Radix UI's SheetPrimitive.Description.
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional CSS class names to apply to the description.
 * @param {React.Ref} ref - A ref to be forwarded to the underlying SheetPrimitive.Description component.
 * @returns {React.ReactElement} A SheetPrimitive.Description component with applied styles and props.
 */
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
