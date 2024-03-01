import React, { useMemo } from "react";

const Button = ({ disabled = false, size = "md", position = "right", icon, children, color = "primary", onClick, className }) => {
  const styling = useMemo(() => {
    const sizes = {
      sm: "text-sm px-[14px] py-2",
      md: "text-sm px-4 py-2.5",
      lg: "text-base px-[18px] py-2.5",
      xl: "text-base px-5 py-3",
      "2xl": "text-lg px-7 py-4",
    };
    const colorDictionary = {
      primary: `disabled:bg-primary-200 bg-primary-600 hover:bg-primary-700 focus:outline-primary-100 text-white`,
      red: `disabled:bg-red-200 bg-red-600 hover:bg-red-700 focus:outline-red-100 text-white`,
      gray: `disabled:bg-grayCustom-50 disabled:text-grayCustom-300 bg-white hover:bg-grayCustom-50 hover:text-grayCustom-800 focus:outline-grayCustom-100 text-grayCustom-700 border border-1 border-solid border-grayCustom-300`,
      bluePrimary: `disabled:bg-bluePrimary-200 bg-bluePrimary-600 hover:bg-bluePrimary-700 focus:outline-bluePrimary-100 text-white`,
      bluePrimaryLight: `disabled:bg-bluePrimary-50 disabled:text-bluePrimary-300 bg-bluePrimary-50 hover:bg-bluePrimary-50 hover:text-bluePrimary-800 focus:outline-bluePrimary-100 text-bluePrimary-700 `,
    };

    const gaps = {
      sm: "gap-2",
      md: "gap-2",
      lg: "gap-2",
      xl: "gap-3",
      "2xl": "gap-3",
    };

    return {
      className: `${sizes[size]} ${gaps[size]} ${colorDictionary[color]} flex items-center font-medium outline outline-4 outline-solid outline-white  rounded-lg break-words`,
    };
  }, [size]);

  const iconProps = {
    className: `${size === "2xl" ? "w-6 h-6" : ""} ${position === "left" ? "mr-0" : "ml-1"} ${!children && "w-6 h-6 !ml-0"} `,
  };

  return (
    <button disabled={disabled} className={`${styling.className} ${className} justify-center items-center px-2`} onClick={onClick}>
      {position === "left" && icon && icon(iconProps)}
      {children}
      {position === "right" && icon && icon(iconProps)}
    </button>
  );
};

export default Button;
