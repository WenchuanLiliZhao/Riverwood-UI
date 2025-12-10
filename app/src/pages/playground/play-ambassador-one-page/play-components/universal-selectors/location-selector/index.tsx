import * as React from "react";
import { ButtonGroup, Button } from "../../../../../../components";
import { COMPONENT_VARIANTS, COMPONENT_SIZES, COMPONENT_SEMANTICS } from "../../../../../../components/shared/tokens";
import type { LocationData } from "../../../data-just-for-1-time-test/location";
import styles from "./_styles.module.scss";
import { locationSelectorWording } from "./wording";

type ButtonValueProp = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">;

export interface LocationSelection {
  region?: string;
  area?: string;
  city?: string;
}

export interface LocationSelectorProps {
  locationData: LocationData;
  value?: LocationSelection;
  onChange?: (selection: LocationSelection) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  locationData,
  value = {},
  onChange,
}) => {
  const [selection, setSelection] = React.useState<LocationSelection>(value);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newSelection = { region: e.target.value || undefined };
    setSelection(newSelection);
    onChange?.(newSelection);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newSelection = { ...selection, area: e.target.value || undefined, city: undefined };
    setSelection(newSelection);
    onChange?.(newSelection);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newSelection = { ...selection, city: e.target.value || undefined };
    setSelection(newSelection);
    onChange?.(newSelection);
  };

  const selectedRegion = selection.region ? locationData[selection.region] : undefined;
  const selectedArea = selectedRegion && selection.area ? selectedRegion.areas[selection.area] : undefined;

  const regions = Object.entries(locationData);
  const areas = selectedRegion ? Object.entries(selectedRegion.areas) : [];
  const cities = selectedArea ? Object.entries(selectedArea.cities) : [];

  const handleClearClick = () => {
    const newSelection = {};
    setSelection(newSelection);
    onChange?.(newSelection);
  };

  return (
    <ButtonGroup
      mode="normal"
      value={[]}
      onChange={(value) => {
        // Handle clear button click
        if (Array.isArray(value) && value.includes("clear")) {
          handleClearClick();
        }
      }}
      elements={[
        [
          <Button
            key="region"
            content={{
              icon: "public",
              text: selection.region ? selectedRegion?.name : locationSelectorWording.region,
              decoIcon: "arrow_drop_down",
            }}
            design={{
              variant: COMPONENT_VARIANTS.outlined,
              size: COMPONENT_SIZES.medium,
              semantic: COMPONENT_SEMANTICS.primary,
            }}
            {...({ value: "region" } as ButtonValueProp)}
          >
            <select
              className={styles["dropdown-overlay"]}
              value={selection.region || ""}
              onChange={handleRegionChange}
              aria-label="Select region"
            >
              <option value="">{locationSelectorWording.region}</option>
              {regions.map(([key, region]) => (
                <option key={key} value={key}>
                  {region.name}
                </option>
              ))}
            </select>
          </Button>,
          <Button
            key="area"
            content={{
              icon: "map",
              text: selection.area ? selectedArea?.name : locationSelectorWording.area,
              decoIcon: !selection.region || areas.length === 0 ? undefined : "arrow_drop_down",
            }}
            design={{
              variant: COMPONENT_VARIANTS.outlined,
              size: COMPONENT_SIZES.medium,
              semantic: COMPONENT_SEMANTICS.primary,
            }}
            disabled={!selection.region || areas.length === 0}
            {...({ value: "area" } as ButtonValueProp)}
          >
            {selection.region && areas.length > 0 && (
              <select
                className={styles["dropdown-overlay"]}
                value={selection.area || ""}
                onChange={handleAreaChange}
                aria-label="Select area"
              >
                <option value="">{locationSelectorWording.area}</option>
                {areas.map(([key, area]) => (
                  <option key={key} value={key}>
                    {area.name}
                  </option>
                ))}
              </select>
            )}
          </Button>,
          <Button
            key="city"
            content={{
              icon: "location_city",
              text: selection.city ? cities.find(([key]) => key === selection.city)?.[1]?.name : locationSelectorWording.city,
              decoIcon: !selection.area || cities.length === 0 ? undefined : "arrow_drop_down",
            }}
            design={{
              variant: COMPONENT_VARIANTS.outlined,
              size: COMPONENT_SIZES.medium,
              semantic: COMPONENT_SEMANTICS.primary,
            }}
            disabled={!selection.area || cities.length === 0}
            {...({ value: "city" } as ButtonValueProp)}
          >
            {selection.area && cities.length > 0 && (
              <select
                className={styles["dropdown-overlay"]}
                value={selection.city || ""}
                onChange={handleCityChange}
                aria-label="Select city"
              >
                <option value="">{locationSelectorWording.city}</option>
                {cities.map(([key, city]) => (
                  <option key={key} value={key}>
                    {city.name}
                  </option>
                ))}
              </select>
            )}
          </Button>,
          <Button
            key="clear"
            content={{
              text: "Clear",
            }}
            design={{
              variant: COMPONENT_VARIANTS.outlined,
              size: COMPONENT_SIZES.medium,
              semantic: COMPONENT_SEMANTICS.primary,
            }}
            disabled={!selection.region && !selection.area && !selection.city}
            {...({ value: "clear" } as ButtonValueProp)}
          />,
        ],
      ]}
    />
  );
};
