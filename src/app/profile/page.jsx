"use client";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.scss";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MyComponent />
    </Suspense>
  );
}

function MyComponent() {
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    price: "",
    address: "",
    phone: "",
    desc: "",
  });
  const [products, setProducts] = useState([]);

  const searchParams = useSearchParams();
  let userId = searchParams.get("userId");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Keep the file if needed for further processing
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append the image file to FormData
    if (imageFile) {
      formData.append("file", imageFile);
    } else {
      return;
    }

    formData.append("userId", userId);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("desc", data.desc);

    await axios
      .post("https://fermerapi.onrender.com/api/products", formData)
      .then((res) => {
        console.log(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (productId) => {
    await axios
      .delete(`https://fermerapi.onrender.com/api/products/${productId}`)
      .then((res) => {
        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(updatedProducts);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(`https://fermerapi.onrender.com/api/products/sort/${userId}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProducts();
  }, [refresh]);

  return (
    <div className={styles.profile}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.top}>
          <form onSubmit={handleSubmit}>
            <h1>Taza ónim qosiw</h1>

            <div className={styles.upload}>
              <label htmlFor="file">
                <img src="/upload.png" alt="" />
              </label>
              <input
                id="file"
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className={styles.images}>
                <div>
                  {image && (
                    <>
                      <img src={image} alt="Uploaded" width="150" />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div>
                <input
                  type="text"
                  placeholder="Onim"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Bahasi"
                  name="price"
                  value={data.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Manzil"
                  name="address"
                  value={data.address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Telefon nomer"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                placeholder="Qosimsha..."
                name="desc"
                value={data.desc}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button>Saqlaw</button>
          </form>
        </div>

        <div className={styles.products}>
          <h1>Menin ónimlerim</h1>
          {products?.map((product) => (
            <div className={styles.item} key={product._id}>
              <div className={styles.image}>
                <img
                  src={`https://fermerapi.onrender.com/Images/${product.image}`}
                  alt=""
                />
              </div>

              <div className={styles.info}>
                <h2>{product.title}</h2>
                <h3>{product.address}</h3>
                <span>{product.price}</span>
                <span>{product.phone}</span>
                <p>{product.desc}</p>
                <div className={styles.buttons}>
                  <button onClick={() => handleDelete(product._id)}>
                    Óshiriw
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
