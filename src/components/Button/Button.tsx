import React from "react";
import styles from "../../styles/Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button = ({ children, onClick }: ButtonProps) => (
  <button className={styles.Button} onClick={onClick ? onClick : undefined}>
    {children}
  </button>
);
