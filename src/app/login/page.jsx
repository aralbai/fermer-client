"use client";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.scss";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post("https://fermerapi.onrender.com/api/users/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token); // Store JWT token
        router.push("/"); // Redirect to protected page
      })
      .catch((err) => {
        console.log(err);
        setMessage("Login yaki parol qate");
      });
  };

  return (
    <div className={styles.login}>
      <Navbar />

      <form className={styles.form} onSubmit={handleLogin}>
        <h1>Kiriw</h1>
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
        <p>{message ? message : ""}</p>

        <button>Kiriw</button>

        <Link href="/register">Registraciya</Link>
      </form>

      <Footer />
    </div>
  );
}
