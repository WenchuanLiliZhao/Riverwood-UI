import { Tooltip } from "../../../components";
import styles from "./_styles.module.scss";

export const Page_Debug_Tooltip_Component = () => {
  return (
    <div className={styles["content"]}>
      <div className={styles["row"]}>
        <Tooltip content={"Top Left"} testing={true}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
        <Tooltip content={"Top Center"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
        <Tooltip content={"Top Right"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
      </div>
      <div className={styles["row"]}>
        {/* for testing position, the content does not matter */}
        <Tooltip content={"Left"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
        <Tooltip content={"Center"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
        <Tooltip content={"Right"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
      </div>
      <div className={styles["row"]}>
        <Tooltip content={"Bottom Left"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
        <Tooltip content={"Bottom Center"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
        <Tooltip content={"Bottom Right"}>
          <div className={styles["tooltip-test-dot"]}></div>
        </Tooltip>
      </div>
    </div>
  );
};
