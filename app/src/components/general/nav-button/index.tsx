
import styles from "./styles.module.scss";
import { RiverwoodLink } from "../../shared/link";
import MaterialIcon from "../../shared/material-icon";

export interface NavIconButtonProps {
  icon: string;
  href: string;
}

export const NavIconButton: React.FC<NavIconButtonProps> = ({ icon, href }) => {
  return (
    <RiverwoodLink href={href} className={styles["nav-button"]}>
      <MaterialIcon icon={icon} size={20} />
      <div className={styles["indicator"]}></div>
    </RiverwoodLink>
  );
};
