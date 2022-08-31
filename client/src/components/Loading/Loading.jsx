import React from "react";
import styles from "./Loading.module.css";

export function Loading() {
  return (
    <svg className={styles.svg} viewBox="0 0 960 300">
      <symbol id="s-text">
        <text textAnchor="middle" x="50%" y="80%">
          Loading.{" "}
        </text>
        <text textAnchor="middle" x="52%" y="80%">
          Loading.{" "}
        </text>
      </symbol>

      <g className="g-ants">
        <use href="#s-text" className={styles.textCopy}></use>
        <use href="#s-text" className={styles.textCopy}></use>
        <use href="#s-text" className={styles.textCopy}></use>
        <use href="#s-text" className={styles.textCopy}></use>
        <use href="#s-text" className={styles.textCopy}></use>
      </g>
    </svg>
  );
}
