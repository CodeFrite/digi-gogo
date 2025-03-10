"use client";
import { useEffect, useState } from "react";
import Canvas from "../components/canvas";
import styles from "./page.module.css";
import CommandPanel from "../components/command-panel";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>
        <Canvas />
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
}
