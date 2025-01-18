import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.right}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="" />
          <h1>FERMER-SHOP</h1>
        </div>
        <div className={styles.link}>
          <img src="/phone.png" alt="" />
          +998 99 488 97 98
        </div>
        <div className={styles.link}>
          <img src="/mail.png" alt="" />
          nurilla.gulimbetov@gmail.com
        </div>
      </div>
    </div>
  );
}
