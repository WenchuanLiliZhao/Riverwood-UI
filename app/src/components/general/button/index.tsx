import * as React from "react";
import { BaseButton, type BaseButtonProps } from "./_BaseButton";

export type BasicButtonProps = BaseButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, BasicButtonProps>(
  (props, ref) => {
    return <BaseButton {...props} ref={ref} />;
  }
);

Button.displayName = "Button";

export default Button;
