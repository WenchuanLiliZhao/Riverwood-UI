import * as React from "react";

import { yearSelectorWording } from "./wording";
import styles from "./_styles.module.scss";
import { Button, COMPONENT_SEMANTICS, COMPONENT_SIZES, COMPONENT_VARIANTS } from "../../../../../../components";

type ButtonValueProp = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">;

export interface YearData {
  year: number;
  label: string;
}

export interface YearSelectorProps {
  yearData: YearData[];
  value?: number;
  onChange?: (year?: number) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  yearData,
  value,
  onChange,
}) => {
  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(value);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newYear = e.target.value ? Number(e.target.value) : undefined;
    setSelectedYear(newYear);
    onChange?.(newYear);
  };

  const selectedYearLabel = yearData.find(y => y.year === selectedYear)?.label || yearSelectorWording.defaultText;

  return (
    <Button
      content={{
        icon: "date_range",
        text: selectedYearLabel,
        decoIcon: "arrow_drop_down",
      }}
      design={{
        variant: COMPONENT_VARIANTS.outlined,
        size: COMPONENT_SIZES.medium,
        semantic: COMPONENT_SEMANTICS.primary,
      }}
      {...({ value: "year" } as ButtonValueProp)}
    >
      <select
        className={styles["dropdown-overlay"]}
        value={selectedYear || ""}
        onChange={handleYearChange}
        aria-label="Select year"
      >
        <option value="">{yearSelectorWording.defaultText}</option>
        {yearData.map((yearItem) => (
          <option key={yearItem.year} value={yearItem.year}>
            {yearItem.label}
          </option>
        ))}
      </select>
    </Button>
  );
};
