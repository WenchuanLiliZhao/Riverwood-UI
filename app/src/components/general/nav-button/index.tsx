
import styles from "./styles.module.scss";
import { RiverwoodLink } from "../../shared/link";
import MaterialIcon from "../../shared/material-icon";

export interface NavButtonProps {
  icon: string;
  href: string;
}

export const NavButton: React.FC<NavButtonProps> = ({ icon, href }) => {
  return (
    <RiverwoodLink to={href} className={styles["nav-button"]}>
      <MaterialIcon icon={icon} size={20} />
      <div className={styles["indicator"]}></div>
    </RiverwoodLink>
  );
};
