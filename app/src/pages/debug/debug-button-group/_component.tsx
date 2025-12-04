import * as React from "react";
import { useState } from "react";
import { ButtonGroup, Button } from "../../../components";
import {
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_SEMANTICS,
} from "../../../components/shared/tokens";
import type { ButtonGroupMode } from "../../../components/general/button-group";
import styles from "./_styles.module.scss";

// Type for button value prop (HTML button elements support value attribute)
type ButtonValueProp = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">;

export const Page_Debug_ButtonGroup_Component = () => {
  const [mode, setMode] = useState<ButtonGroupMode>("switch");
  const [switchValue, setSwitchValue] = useState<string>("");
  const [normalValue, setNormalValue] = useState<string[]>([]);

  return (
    <div className={styles["content"]}>
      <section className={styles["section"]}>
        <h2 className={styles["section-title"]}>ButtonGroup Playground</h2>
        <p className={styles["section-description"]}>
          Test the ButtonGroup component with different modes and configurations
        </p>

        <div className={styles["controls"]}>
          <div className={styles["control-group"]}>
            <label className={styles["control-label"]} htmlFor="mode-select">
              Mode
            </label>
            <select
              id="mode-select"
              className={styles["control-select"]}
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as ButtonGroupMode);
                setSwitchValue("");
                setNormalValue([]);
              }}
              aria-label="Select button group mode"
            >
              <option value="switch">Switch (Single Selection)</option>
              <option value="normal">Normal (Multiple Selection)</option>
            </select>
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]}>
              Current Value: {mode === "switch" ? switchValue || "none" : normalValue.join(", ") || "none"}
            </label>
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            Switch Mode - Using ReactElement (Existing API)
          </div>
          <div className={styles["preview-content"]}>
            <ButtonGroup
              mode="switch"
              elements={[
                [
                  <Button
                    key="1"
                    content={{ text: "Option 1" }}
                    {...({ value: "opt1" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="2"
                    content={{ text: "Option 2" }}
                    {...({ value: "opt2" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="3"
                    content={{ text: "Option 3" }}
                    {...({ value: "opt3" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                ],
              ]}
              value={switchValue}
              onChange={(value) => setSwitchValue(value as string)}
            />
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            Switch Mode - Using ButtonConfig (New Declarative API)
          </div>
          <div className={styles["preview-content"]}>
            <ButtonGroup
              mode="switch"
              elements={[
                [
                  {
                    content: { text: "Option 1" },
                    value: "opt1",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { text: "Option 2" },
                    value: "opt2",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { text: "Option 3" },
                    value: "opt3",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                ],
              ]}
              value={switchValue}
              onChange={(value) => setSwitchValue(value as string)}
            />
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            Normal Mode - Using Button Components (ReactElement)
          </div>
          <div className={styles["preview-content"]}>
            <ButtonGroup
              mode="normal"
              elements={[
                [
                  <Button
                    key="1"
                    content={{ text: "Bold" }}
                    {...({ value: "bold" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="2"
                    content={{ text: "Italic" }}
                    {...({ value: "italic" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="3"
                    content={{ text: "Underline" }}
                    {...({ value: "underline" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                ],
                [
                  <Button
                    key="4"
                    content={{ text: "Left" }}
                    {...({ value: "left" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="5"
                    content={{ text: "Center" }}
                    {...({ value: "center" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="6"
                    content={{ text: "Right" }}
                    {...({ value: "right" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                ],
              ]}
              value={normalValue}
              onChange={(values) => setNormalValue(values as string[])}
            />
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            Normal Mode - Using ButtonConfig (New Declarative API)
          </div>
          <div className={styles["preview-content"]}>
            <ButtonGroup
              mode="normal"
              elements={[
                [
                  {
                    content: { text: "Bold" },
                    value: "bold",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { text: "Italic" },
                    value: "italic",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { text: "Underline" },
                    value: "underline",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                ],
                [
                  {
                    content: { text: "Left" },
                    value: "left",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { text: "Center" },
                    value: "center",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { text: "Right" },
                    value: "right",
                    design: {
                      variant: COMPONENT_VARIANTS.outlined,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                ],
              ]}
              value={normalValue}
              onChange={(values) => setNormalValue(values as string[])}
            />
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            With Icons - Using Button Components (ReactElement)
          </div>
          <div className={styles["preview-content"]}>
            <ButtonGroup
              mode="switch"
              elements={[
                [
                  <Button
                    key="1"
                    content={{ icon: "format_bold", text: "Bold" }}
                    {...({ value: "bold" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.ghost,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="2"
                    content={{ icon: "format_italic", text: "Italic" }}
                    {...({ value: "italic" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.ghost,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                  <Button
                    key="3"
                    content={{ icon: "format_underlined", text: "Underline" }}
                    {...({ value: "underline" } as ButtonValueProp)}
                    design={{
                      variant: COMPONENT_VARIANTS.ghost,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    }}
                  />,
                ],
              ]}
            />
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            With Icons - Using ButtonConfig (New Declarative API)
          </div>
          <div className={styles["preview-content"]}>
            <ButtonGroup
              mode="switch"
              elements={[
                [
                  {
                    content: { icon: "format_bold", text: "Bold" },
                    value: "bold",
                    design: {
                      variant: COMPONENT_VARIANTS.ghost,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { icon: "format_italic", text: "Italic" },
                    value: "italic",
                    design: {
                      variant: COMPONENT_VARIANTS.ghost,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                  {
                    content: { icon: "format_underlined", text: "Underline" },
                    value: "underline",
                    design: {
                      variant: COMPONENT_VARIANTS.ghost,
                      size: COMPONENT_SIZES.medium,
                      semantic: COMPONENT_SEMANTICS.primary,
                    },
                  },
                ],
              ]}
            />
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>
            Different Sizes - Using Button Components (ReactElement)
          </div>
          <div className={styles["preview-content"]}>
            <div className={styles["size-group"]}>
              <div>
                <div className={styles["size-label"]}>Small</div>
                <ButtonGroup
                  mode="switch"
                  elements={[
                    [
                      <Button
                        key="1"
                        content={{ text: "S" }}
                        {...({ value: "small" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.small,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                      <Button
                        key="2"
                        content={{ text: "M" }}
                        {...({ value: "medium" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.small,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                      <Button
                        key="3"
                        content={{ text: "L" }}
                        {...({ value: "large" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.small,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                    ],
                  ]}
                />
              </div>
              <div>
                <div className={styles["size-label"]}>Medium</div>
                <ButtonGroup
                  mode="switch"
                  elements={[
                    [
                      <Button
                        key="1"
                        content={{ text: "S" }}
                        {...({ value: "small" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.medium,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                      <Button
                        key="2"
                        content={{ text: "M" }}
                        {...({ value: "medium" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.medium,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                      <Button
                        key="3"
                        content={{ text: "L" }}
                        {...({ value: "large" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.medium,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                    ],
                  ]}
                />
              </div>
              <div>
                <div className={styles["size-label"]}>Large</div>
                <ButtonGroup
                  mode="switch"
                  elements={[
                    [
                      <Button
                        key="1"
                        content={{ text: "S" }}
                        {...({ value: "small" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.large,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                      <Button
                        key="2"
                        content={{ text: "M" }}
                        {...({ value: "medium" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.large,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                      <Button
                        key="3"
                        content={{ text: "L" }}
                        {...({ value: "large" } as ButtonValueProp)}
                        design={{
                          variant: COMPONENT_VARIANTS.outlined,
                          size: COMPONENT_SIZES.large,
                          semantic: COMPONENT_SEMANTICS.primary,
                        }}
                      />,
                    ],
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

