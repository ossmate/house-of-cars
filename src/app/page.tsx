"use client";

import { Button } from "@/components/ui/Button";
import { css } from "../../styled-system/css";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div
      className={css({
        fontSize: "2xl",
        fontWeight: "bold",
      })}
    >
      Hello 🐼!
      <Button variant="destructive" onClick={() => console.log("clicked")}>
        Click me
      </Button>
    </div>
  );
}
