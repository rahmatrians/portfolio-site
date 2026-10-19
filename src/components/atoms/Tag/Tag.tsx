import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

// Small gray chip (e.g. a tech stack item)
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-10.5 items-center rounded-md bg-[#EFEFEF] px-6.5 font-poppins text-[15px] text-[#808080]",
        className
      )}
    >
      {children}
    </span>
  );
}
