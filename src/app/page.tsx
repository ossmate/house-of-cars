"use client";

import { Button } from "@/components/Button/Button";
import { css } from "../../styled-system/css";

export default function Home() {
  return (
    <div
      className={css({
        fontSize: "2xl",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        h: "dvh",
      })}
    >
      Hello 🐼!
      <Button onClick={() => console.log("clicked")}>Click me</Button>
    </div>
  );
}
