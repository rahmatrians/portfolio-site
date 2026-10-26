import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { LiquidWave } from "@/components/atoms/LiquidWave"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      // Liquid dual-wave hover + elastic click compress (see atoms/LiquidWave).
      // isolate/overflow-hidden contain the blend layer to the button;
      // press squashes fast, release springs back with overshoot.
      liquid: {
        true: "relative isolate overflow-hidden transition-[scale,color,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.8,0.64,1)] active:scale-x-92 active:scale-y-84 active:duration-100 active:ease-out",
        false: "",
      },
    },
    compoundVariants: [
      // The waves are the hover feedback; keep the base colours steady so the
      // `difference` blend inverts cleanly
      { variant: "default", liquid: true, class: "hover:bg-primary" },
      {
        variant: "outline",
        liquid: true,
        class: "hover:bg-background hover:text-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      liquid: true,
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  liquid = true,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, liquid, className }))}
      {...props}
    >
      {/* Slottable: with asChild, the child element becomes the host and the
          wave layer is appended inside it, after the label */}
      <Slottable>{children}</Slottable>
      {liquid && <LiquidWave />}
    </Comp>
  )
}

export { Button, buttonVariants }
