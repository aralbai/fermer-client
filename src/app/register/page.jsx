"use client";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.scss";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetry, setPasswordRetry] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(phone, username, password, passwordRetry);

    if (password !== passwordRetry) {
      return setMessage("Paroller birdey boliwi kerek!");
    }

    await axios
      .post("https://fermerapi.onrender.com/api/users/register", {
        phone,
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Bunday paydalaniwshi bar!");
      });
  };

  return (
    <div className={styles.login}>
      <Navbar />

      <form className={styles.form} onSubmit={handleRegister}>
        <h1>Registraciya</h1>
        <input
          type="text"
          placeholder="Telefon nomer"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Paroldi tastiyqlaw"
          value={passwordRetry}
          onChange={(e) => setPasswordRetry(e.target.value)}
        />

        <p>{message ? message : ""}</p>

        <button>Registraciya</button>

        <Link href="/login">Kiriw</Link>
      </form>

      <Footer />
    </div>
  );
}
