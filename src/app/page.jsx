import styles from "./page.module.css";
import Navbar from "@/components/navbar/Navbar";
import Slider from "@/components/slider/Slider";
import Products from "@/components/products/Products";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Slider />
      <Products />
      <Footer />
    </div>
  );
}
