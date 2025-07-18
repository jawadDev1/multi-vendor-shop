import cn from "../../../../../utils/cn";

interface LabelProps {
  className?: string;
  required?: boolean;
  label: string;
  name: string;
}

const Label = ({ className, name, label, required }: LabelProps) => {
  return (
    <label htmlFor={name} className={cn("text-primary ", className)}>
      {label} {required && <span className="text-tomato-red">*</span>}
    </label>
  );
};

export default Label;
