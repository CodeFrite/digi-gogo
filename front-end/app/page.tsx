"use client";
import { useEffect, useState } from "react";
import Canvas from "../components/canvas";
import styles from "./page.module.css";
import CommandPanel from "../components/command-panel";
import Header from "../components/header";

export default function Home() {
  const [controlPanelVisibility, setControlPanelVisibility] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Meta") {
      console.log("keydown: toggle control panel visibility");
      toggleControlPanelVisibility();
    }
  };

  // toggle control panel visibility
  const toggleControlPanelVisibility = () => {
    setControlPanelVisibility((prev) => !prev);
  };

  return <>Hello, World!</>;
}
