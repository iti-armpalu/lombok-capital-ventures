"use client";

import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.companyName}>Lombok Capital Ventures</h1>
    </header>
  );
}