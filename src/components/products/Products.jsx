"use client";
import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(`https://fermerapi.onrender.com/api/products`)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.products}>
      <div className={styles.filter}>
        <div className={styles.price}>
          <div>
            <input type="checkbox" />
            Eń arzan
          </div>
          <div>
            <input type="checkbox" />
            Eń qimbat
          </div>
          <button>Qollaw</button>
        </div>

        <div className={styles.price}>
          <div>
            <input type="checkbox" />
            Paliz ónimleri
          </div>
          <div>
            <input type="checkbox" />
            Miyweler
          </div>
          <div>
            <input type="checkbox" />
            Dán ónimleri
          </div>
          <div>
            <input type="checkbox" />
            Qaqlanǵan ónimler
          </div>
          <div>
            <input type="checkbox" />
            Dárilik ósimlikler
          </div>
          <button>Qollaw</button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.dark}>
          <img src="/logo.png" alt="" />

          <p>Siz izlegen ónimler</p>
        </div>
        <div className={styles.row}>
          {products?.map((product) => (
            <div className={styles.item} key={product._id}>
              <div className={styles.img}>
                <Image
                  width={100}
                  height={100}
                  src={`https://fermerapi.onrender.com/Images/${product.image}`}
                  alt={product.title}
                />
              </div>
              <div className={styles.info}>
                <h1>{product.title}</h1>
                <p>{product.address}</p>
                <span>{product.price} SWM</span>
                <Link
                  href={{
                    pathname: "/single-product",
                    query: {
                      title: product.title,
                      price: product.price,
                      address: product.address,
                      phone: product.phone,
                      desc: product.desc,
                      image: product.image,
                    },
                  }}
                >
                  Toliq kóriw
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
