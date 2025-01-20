import React, { useState, useCallback, useEffect } from "react";
import "./yearPicker.scss";
import { IoChevronDown } from "react-icons/io5";

type YearPickerProps = {
  onChange: (selectedYear: number) => void;
};

const currentYear = new Date().getFullYear();
const years = [
  -1,
  ...Array.from({ length: 60 }, (_, i) => currentYear - 60 + i + 1).reverse(),
];

export const YearPicker = (props: YearPickerProps) => {
  const { onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = useCallback(
    (year: number) => {
      setSelectedYear(year);
      onChange(year);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".yearPicker")) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick, isOpen]);

  return (
    <div className="yearPicker">
      <label
        className={`yearPicker__label ${
          isOpen || selectedYear !== -1 ? "float" : ""
        }`}
      >
        Select Year
      </label>
      <button
        className={`yearPicker__button ${isOpen ? "yearPickerOpen" : ""}`}
        onClick={toggleDropdown}
      >
        <span>
          {selectedYear === -1 ? `${isOpen ? "All" : ""}` : selectedYear}
        </span>
        <IoChevronDown
          className={`yearPicker__icon ${isOpen ? "rotate" : ""}`}
          size={"14px"}
        />
      </button>
      {isOpen && (
        <div className="yearPicker__dropdown">
          {years.map((year) => (
            <p
              key={year}
              className="yearPicker__option"
              onClick={() => handleOptionClick(year)}
            >
              {year === -1 ? "All" : year}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
