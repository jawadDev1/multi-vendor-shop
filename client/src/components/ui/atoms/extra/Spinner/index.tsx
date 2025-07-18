import cn from "@/utils/cn";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "size-6 rounded-full bg-transparent border-t-2 mx-auto border-azure-blue animate-spin",
        className
      )}
    ></div>
  );
};

export default Spinner;
