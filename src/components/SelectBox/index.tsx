import React from "react";
import { useCallback, useState } from "react";
import { eOMDBType } from "../../network";

type SelectBoxProps = {
  options: eOMDBType[];
  onChange: (selectedType: eOMDBType) => void;
};

export const SelectBox = (props: SelectBoxProps) => {
  const { onChange, options } = props;
  const [selectedType, setSelectedType] = useState<eOMDBType>(options[0]);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = event.target.value as eOMDBType;
      setSelectedType(newType);
      onChange(newType);
    },
    [onChange]
  );

  return (
    <select value={selectedType} onChange={handleSelectChange}>
      {options.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};
