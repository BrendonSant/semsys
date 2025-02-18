import React from "react";
import { UseFormRegister } from "react-hook-form";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  name: string;
  register: UseFormRegister<any>;
  options: Option[];
  className?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ name, register, options, className, placeholder }) => {
  return (
    <select {...register(name)} className={className}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
