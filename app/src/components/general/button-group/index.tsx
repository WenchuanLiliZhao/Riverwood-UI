import * as React from "react";
import {
  BaseButtonGroup,
  type BaseButtonGroupProps,
  type ButtonGroupMode,
  type ButtonConfig,
} from "./_BaseButtonGroup";

export type ButtonGroupProps = BaseButtonGroupProps;

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    return <BaseButtonGroup {...props} ref={ref} />;
  }
);

ButtonGroup.displayName = "ButtonGroup";

export type { ButtonGroupMode, ButtonConfig };
export default ButtonGroup;

