import { Button } from "../../../components";
import styles from "./_styles.module.scss";

export const Page_Debug_Button_Component = () => {
  return (
    <div className={styles["content"]}>
      <section className={styles["section"]}>
        <h2 className={styles["section-title"]}>Variants</h2>
        <div className={styles["button-group"]}>
          <Button
            content={{
              icon: "home",
              text: "Fill",
              decoIcon: "arrow_drop_down",
            }}
          />
          <Button
            content={{
              icon: "home",
              text: "Fill Inverse",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "fill-inverse",
              size: "medium",
            }}
          />
          <Button
            content={{
              icon: "home",
              text: "Ghost",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "ghost",
              size: "medium",
            }}
          />
          <Button
            content={{
              icon: "home",
              text: "Outlined",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "outlined",
              size: "medium",
            }}
          />
        </div>
      </section>

      <section className={styles["section"]}>
        <h2 className={styles["section-title"]}>Sizes</h2>
        <div className={styles["button-group"]}>
          <Button
            content={{
              icon: "home",
              text: "Small",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "fill",
              size: "small",
            }}
          />
          <Button
            content={{
              icon: "home",
              text: "Medium",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "fill",
              size: "medium",
            }}
          />
        </div>
      </section>

      <section className={styles["section"]}>
        <h2 className={styles["section-title"]}>Without Icons</h2>
        <div className={styles["button-group"]}>
          <Button
            content={{
              icon: "",
              text: "Text Only",
              decoIcon: "",
            }}
            design={{
              variant: "fill",
              size: "medium",
            }}
          />
          <Button
            content={{
              icon: "home",
              text: "With Icon Only",
              decoIcon: "",
            }}
            design={{
              variant: "fill",
              size: "medium",
            }}
          />
          <Button
            content={{
              icon: "",
              text: "With Deco Icon Only",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "fill",
              size: "medium",
            }}
          />
        </div>
      </section>

      <section className={styles["section"]}>
        <h2 className={styles["section-title"]}>States</h2>
        <div className={styles["button-group"]}>
          <Button
            content={{
              icon: "home",
              text: "Normal",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "fill",
              size: "medium",
            }}
          />
          <Button
            content={{
              icon: "home",
              text: "Disabled",
              decoIcon: "arrow_forward",
            }}
            design={{
              variant: "fill",
              size: "medium",
            }}
            disabled
          />
        </div>
      </section>
    </div>
  );
};
