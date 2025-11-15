
import { DebugPages } from "../../debug";
import styles from './_component.module.scss';

export default function Page_Home_Component() {
  return (
    <div className={styles.container}>
      <a href={`/${DebugPages.Page_Debug_Tooltip.header.slug}`}>Debug Tooltip</a>
    </div>
  )
}