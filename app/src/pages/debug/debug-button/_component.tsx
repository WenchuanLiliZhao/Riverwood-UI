import { useState } from "react";
import { Button } from "../../../components";
import {
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_SEMANTICS,
} from "../../../components/shared/tokens";
import styles from "./_styles.module.scss";

export const Page_Debug_Button_Component = () => {
  const [variant, setVariant] = useState<keyof typeof COMPONENT_VARIANTS>("fill");
  const [size, setSize] = useState<keyof typeof COMPONENT_SIZES>("medium");
  const [semantic, setSemantic] = useState<keyof typeof COMPONENT_SEMANTICS>("primary");
  const [icon, setIcon] = useState("home");
  const [text, setText] = useState("Button");
  const [decoIcon, setDecoIcon] = useState("arrow_drop_down");
  const [disabled, setDisabled] = useState(false);

  return (
    <div className={styles["content"]}>
      <section className={styles["section"]}>
        <h2 className={styles["section-title"]}>Button Playground</h2>
        <p className={styles["section-description"]}>
          Adjust the properties below to see the button changes in real-time
        </p>

        <div className={styles["controls"]}>
          <div className={styles["control-group"]}>
            <label className={styles["control-label"]} htmlFor="variant-select">
              Variant
            </label>
            <select
              id="variant-select"
              className={styles["control-select"]}
              value={variant}
              onChange={(e) => setVariant(e.target.value as keyof typeof COMPONENT_VARIANTS)}
              aria-label="Select button variant"
            >
              {Object.keys(COMPONENT_VARIANTS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]} htmlFor="size-select">
              Size
            </label>
            <select
              id="size-select"
              className={styles["control-select"]}
              value={size}
              onChange={(e) => setSize(e.target.value as keyof typeof COMPONENT_SIZES)}
              aria-label="Select button size"
            >
              {Object.keys(COMPONENT_SIZES).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]} htmlFor="semantic-select">
              Semantic
            </label>
            <select
              id="semantic-select"
              className={styles["control-select"]}
              value={semantic}
              onChange={(e) => setSemantic(e.target.value as keyof typeof COMPONENT_SEMANTICS)}
              aria-label="Select button semantic"
            >
              {Object.keys(COMPONENT_SEMANTICS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]}>Icon</label>
            <input
              type="text"
              className={styles["control-input"]}
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="e.g., home, star, etc."
            />
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]}>Text</label>
            <input
              type="text"
              className={styles["control-input"]}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Button text"
            />
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]}>Deco Icon</label>
            <input
              type="text"
              className={styles["control-input"]}
              value={decoIcon}
              onChange={(e) => setDecoIcon(e.target.value)}
              placeholder="e.g., arrow_drop_down"
            />
          </div>

          <div className={styles["control-group"]}>
            <label className={styles["control-label"]}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className={styles["control-checkbox"]}
              />
              Disabled
            </label>
          </div>
        </div>

        <div className={styles["preview"]}>
          <div className={styles["preview-label"]}>Preview</div>
          <div className={styles["button-group"]}>
            <Button
              content={{
                icon: icon || undefined,
                text: text || undefined,
                decoIcon: decoIcon || undefined,
              }}
              design={{
                variant: COMPONENT_VARIANTS[variant],
                size: COMPONENT_SIZES[size],
                semantic: COMPONENT_SEMANTICS[semantic],
              }}
              disabled={disabled}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
