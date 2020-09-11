import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || email.length < 3) return;

    axios
      .post("/api/subscribe", { email })
      .then((res) => {
        setEmail("");
      })
      .catch((err) => {
        console.err(err);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>VemProFut</title>
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <h3>VemProFut</h3>
          <p>Quer ficar por dentro das novidades? Assine a nossa newsletter</p>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Assinar
            </button>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <img src="/logo.png" alt="Thoca Logo" className={styles.logo} />
      </footer>
    </div>
  );
}
