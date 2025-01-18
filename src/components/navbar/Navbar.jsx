"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [id, setId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token);
    setId(token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home or login page
    setId("");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="" />
          <h1>FERMER-SHOP</h1>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Tekst..." />
          <button>Izlew</button>
        </div>

        <div className={styles.auth}>
          {isLoggedIn ? (
            <>
              <Link
                href={{
                  pathname: "/profile",
                  query: {
                    userId: id,
                  },
                }}
              >
                Profil
              </Link>
              <button onClick={handleLogout}>Shıǵıw</button>
            </>
          ) : (
            <>
              <Link href="/login">Kiriw</Link>
              <Link href="/register">Registraciya</Link>
            </>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <ul>
          <li className={styles.active}>
            <Link href="/">Bas bet</Link>
          </li>
          <li>
            <Link href="/">Biz haqqimizda</Link>
          </li>
          <li>
            <Link href="/">Baylanis</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
