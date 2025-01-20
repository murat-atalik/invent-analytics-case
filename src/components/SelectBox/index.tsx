import React, { useState, useCallback, useEffect } from "react";
import "./selectBox.scss";
import { eOMDBType } from "../../network";
import { IoChevronDown } from "react-icons/io5";

type SelectBoxProps = {
  options: eOMDBType[];
  onChange: (selectedType: eOMDBType) => void;
};

export const SelectBox = (props: SelectBoxProps) => {
  const { options, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<eOMDBType>(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = useCallback(
    (type: eOMDBType) => {
      setSelectedType(type);
      onChange(type);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".customSelectBox")) {
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
    <div className="customSelectBox">
      <label
        className={`customSelectBox__label ${
          isOpen || selectedType !== eOMDBType.ALL ? "float" : ""
        }`}
      >
        Select Type
      </label>
      <button
        className={`customSelectBox__button ${
          isOpen ? "customSelectBoxOpen" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span>
          {selectedType === eOMDBType.ALL
            ? ""
            : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
        </span>
        <IoChevronDown
          className={`customSelectBox__icon ${isOpen ? "rotate" : ""}`}
          size={"14px"}
        />
      </button>
      {isOpen && (
        <div className="customSelectBox__dropdown">
          {options.map((type) => (
            <p
              key={type}
              className="customSelectBox__option"
              onClick={() => handleOptionClick(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
