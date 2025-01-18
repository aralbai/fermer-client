import styles from "./Slider.module.scss";

export default function Slider() {
  return (
    <div className={styles.slider}>
      <div className={styles.slide}>
        <img src="/slider.jpg" alt="" className={styles.slideImg} />
      </div>

      <div className={styles.menu}>
        <div className={styles.item}>
          <div>
            <img src="/vegetables.png" />
          </div>
          <h2>Palız ónimleri</h2>
        </div>
        <div className={styles.item}>
          <div>
            <img src="/fruits.png" />
          </div>
          <h2>Miyweler</h2>
        </div>
        <div className={styles.item}>
          <div>
            <img src="/seeds.png" />
          </div>
          <h2>Dánli ónimler</h2>
        </div>
      </div>
    </div>
  );
}
